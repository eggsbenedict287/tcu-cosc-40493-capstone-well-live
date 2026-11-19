package com.welllive.backend;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.welllive.backend.repository.AssessmentRepository;
import com.welllive.backend.repository.MemberRepository;
import com.welllive.backend.assessment.AssessmentService;
import com.welllive.backend.assessment.AssessmentUpdate;
import com.welllive.backend.assessment.AssessmentAnswer;
import com.welllive.backend.assessment.AnswerStatus;
import com.welllive.backend.error.ApiException;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;
import jakarta.servlet.http.Cookie;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;

import java.util.Map;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource(properties = {
        "app.assessment.encryption-key=MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTIzNDU2Nzg5MDE=",
        "app.security.allowed-origin=http://localhost:8100"
})
class AssessmentUpdateIntegrationTest {
    @Autowired MockMvc mvc;
    @Autowired ObjectMapper mapper;
    @Autowired MemberRepository members;
    @Autowired AssessmentService service;
    @Autowired AssessmentRepository assessments;

    @BeforeEach void clean() { assessments.deleteAll(); members.deleteAll(); }

    @Test void updatesAnswersAndMetadataAndReconcilesAnEquivalentRetry() throws Exception {
        MockHttpSession session = register("update@example.test");
        String completedAt = complete(session);
        UUID updateId = UUID.randomUUID();
        String payload = update(updateId, 0, Map.of("exercise_and_activity", Map.of("status", "CONCERN")), false);
        var result = mvc.perform(csrf(put("/api/assessment"), session).contentType(MediaType.APPLICATION_JSON)
                .content(payload)).andExpect(status().isOk())
                .andExpect(header().string("Cache-Control", "no-store"))
                .andExpect(jsonPath("$.revision").value(1))
                .andExpect(jsonPath("$.completedAt").value(completedAt))
                .andExpect(jsonPath("$.updatedAt").isNotEmpty())
                .andExpect(jsonPath("$.answers.exercise_and_activity.status").value("CONCERN"))
                .andExpect(jsonPath("$.answers.sleep_problems.status").value("SKIPPED")).andReturn();
        String updatedAt = mapper.readTree(result.getResponse().getContentAsString()).get("updatedAt").asText();
        mvc.perform(csrf(put("/api/assessment"), session).contentType(MediaType.APPLICATION_JSON).content(payload))
                .andExpect(status().isOk()).andExpect(jsonPath("$.revision").value(1))
                .andExpect(jsonPath("$.updatedAt").value(updatedAt));
        mvc.perform(get("/api/assessment").session(session)).andExpect(status().isOk())
                .andExpect(jsonPath("$.answers.exercise_and_activity.status").value("CONCERN"));
        assertThat(assessments.count()).isEqualTo(1);
    }

    @Test void staleEditsAndReusedIdentifiersCannotOverwriteNewerAnswers() throws Exception {
        MockHttpSession session = register("conflict@example.test");
        complete(session);
        UUID updateId = UUID.randomUUID();
        mvc.perform(csrf(put("/api/assessment"), session).contentType(MediaType.APPLICATION_JSON)
                .content(update(updateId, 0, Map.of("sleep_problems", Map.of("status", "NO_CONCERN")), false)))
                .andExpect(status().isOk());
        mvc.perform(csrf(put("/api/assessment"), session).contentType(MediaType.APPLICATION_JSON)
                .content(update(UUID.randomUUID(), 0, Map.of("sleep_problems", Map.of("status", "CONCERN")), false)))
                .andExpect(status().isConflict()).andExpect(jsonPath("$.code").value("ASSESSMENT_CHANGED"));
        mvc.perform(csrf(put("/api/assessment"), session).contentType(MediaType.APPLICATION_JSON)
                .content(update(updateId, 0, Map.of("sleep_problems", Map.of("status", "CONCERN")), false)))
                .andExpect(status().isConflict()).andExpect(jsonPath("$.code").value("UPDATE_ID_REUSED"));
        mvc.perform(get("/api/assessment").session(session))
                .andExpect(jsonPath("$.answers.sleep_problems.status").value("NO_CONCERN"))
                .andExpect(jsonPath("$.revision").value(1));
    }

    @Test void invalidUpdatesPreserveThePreviousEncryptedRecord() throws Exception {
        MockHttpSession session = register("validation@example.test");
        complete(session);
        UUID id = members.findByEmailIgnoreCase("validation@example.test").orElseThrow().getId();
        byte[] original = assessments.findByMemberId(id).orElseThrow().getEncryptedAnswers();
        mvc.perform(csrf(put("/api/assessment"), session).contentType(MediaType.APPLICATION_JSON)
                .content(update(UUID.randomUUID(), 0, Map.of("age", Map.of("value", "151")), false)))
                .andExpect(status().isUnprocessableEntity());
        assertThat(assessments.findByMemberId(id).orElseThrow().getEncryptedAnswers()).isEqualTo(original);
    }

    @Test void clearingAllAnswersRequiresConfirmationAndRemovesOldValues() throws Exception {
        MockHttpSession session = register("clear@example.test");
        complete(session);
        UUID updateId = UUID.randomUUID();
        mvc.perform(csrf(put("/api/assessment"), session).contentType(MediaType.APPLICATION_JSON)
                .content(update(updateId, 0, Map.of(), false)))
                .andExpect(status().isUnprocessableEntity())
                .andExpect(jsonPath("$.code").value("CLEAR_CONFIRMATION_REQUIRED"));
        mvc.perform(get("/api/assessment").session(session))
                .andExpect(jsonPath("$.answers.sleep_problems.status").value("CONCERN"));
        mvc.perform(csrf(put("/api/assessment"), session).contentType(MediaType.APPLICATION_JSON)
                .content(update(updateId, 0, Map.of(), true))).andExpect(status().isOk())
                .andExpect(jsonPath("$.answers.sleep_problems.status").value("SKIPPED"))
                .andExpect(jsonPath("$.answers.skin_or_nail_changes.followUpText").doesNotExist());
        assertThat(assessments.count()).isEqualTo(1);
    }

    @Test void updateRequiresAuthenticationCsrfAndAnAssessmentOwnedByTheSession() throws Exception {
        MockHttpSession owner = register("owner@example.test");
        complete(owner);
        UUID ownerId = members.findByEmailIgnoreCase("owner@example.test").orElseThrow().getId();
        String payload = update(UUID.randomUUID(), 0, Map.of(), true);
        mvc.perform(put("/api/assessment").session(owner).contentType(MediaType.APPLICATION_JSON).content(payload))
                .andExpect(status().isForbidden());
        mvc.perform(csrf(put("/api/assessment"), null).contentType(MediaType.APPLICATION_JSON).content(payload))
                .andExpect(status().isUnauthorized());
        MockHttpSession other = register("other@example.test");
        mvc.perform(csrf(put("/api/assessment").param("memberId", ownerId.toString()), other)
                .contentType(MediaType.APPLICATION_JSON).content(payload)).andExpect(status().isNotFound());
        mvc.perform(get("/api/assessment").session(owner))
                .andExpect(jsonPath("$.answers.sleep_problems.status").value("CONCERN"));
    }

    @Test void simultaneousEditsCannotSilentlyOverwriteEachOther() throws Exception {
        MockHttpSession session = register("parallel@example.test");
        complete(session);
        UUID memberId = members.findByEmailIgnoreCase("parallel@example.test").orElseThrow().getId();
        CountDownLatch ready = new CountDownLatch(2);
        CountDownLatch start = new CountDownLatch(1);
        try (var executor = Executors.newFixedThreadPool(2)) {
            var first = executor.submit(() -> updateInParallel(memberId, AnswerStatus.NO_CONCERN, ready, start));
            var second = executor.submit(() -> updateInParallel(memberId, AnswerStatus.CONCERN, ready, start));
            assertThat(ready.await(5, TimeUnit.SECONDS)).isTrue();
            start.countDown();
            assertThat(java.util.List.of(first.get(10, TimeUnit.SECONDS), second.get(10, TimeUnit.SECONDS)))
                    .containsExactlyInAnyOrder("saved", "ASSESSMENT_CHANGED");
            assertThat(assessments.findByMemberId(memberId).orElseThrow().getRevision()).isEqualTo(1);
        }
    }

    private String updateInParallel(UUID memberId, AnswerStatus status, CountDownLatch ready, CountDownLatch start)
            throws InterruptedException {
        ready.countDown();
        start.await();
        try {
            service.update(memberId, new AssessmentUpdate(1, UUID.randomUUID(), 0L,
                    Map.of("sleep_problems", new AssessmentAnswer(status, null, null, null)), Map.of(), false));
            return "saved";
        } catch (ApiException exception) {
            return exception.getCode();
        }
    }

    private String update(UUID updateId, long revision, Map<String, ?> answers, boolean confirm) throws Exception {
        return mapper.writeValueAsString(Map.of("formVersion", 1, "updateId", updateId,
                "expectedRevision", revision, "answers", answers, "confirmClearAll", confirm));
    }

    private String complete(MockHttpSession session) throws Exception {
        var result = mvc.perform(csrf(post("/api/assessment"), session).contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(Map.of("formVersion", 1, "submissionId", UUID.randomUUID(),
                        "answers", Map.of("sleep_problems", Map.of("status", "CONCERN"),
                                "skin_or_nail_changes", Map.of("status", "CONCERN", "followUpText", "Private detail"))))))
                .andExpect(status().isCreated()).andReturn();
        return mapper.readTree(result.getResponse().getContentAsString()).get("completedAt").asText();
    }

    private MockHttpSession register(String email) throws Exception {
        var result = mvc.perform(csrf(post("/api/auth/register"), null).contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(Map.of("email", email, "password", "correct-horse-battery-staple",
                        "firstName", "Test", "lastName", "Member", "ageEligibilityConfirmed", true,
                        "termsAccepted", true)))).andExpect(status().isCreated()).andReturn();
        return (MockHttpSession) result.getRequest().getSession(false);
    }

    private MockHttpServletRequestBuilder csrf(MockHttpServletRequestBuilder request, MockHttpSession session)
            throws Exception {
        var tokenRequest = get("/api/auth/csrf");
        if (session != null) tokenRequest.session(session);
        Cookie cookie = mvc.perform(tokenRequest).andReturn().getResponse().getCookie("XSRF-TOKEN");
        assertThat(cookie).isNotNull();
        request.cookie(cookie).header("X-XSRF-TOKEN", cookie.getValue());
        if (session != null) request.session(session);
        return request;
    }
}
