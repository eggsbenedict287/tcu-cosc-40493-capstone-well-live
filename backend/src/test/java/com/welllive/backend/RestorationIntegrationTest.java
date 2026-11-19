package com.welllive.backend;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.welllive.backend.repository.AssessmentRepository;
import com.welllive.backend.repository.MemberRepository;
import com.welllive.backend.domain.Member;
import jakarta.servlet.http.Cookie;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;

import java.util.Map;
import java.util.UUID;
import java.time.Instant;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource(properties = {
        "app.assessment.encryption-key=MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTIzNDU2Nzg5MDE=",
        "app.security.allowed-origin=http://localhost:8100"
})
class RestorationIntegrationTest {
    private static final String PASSWORD = "correct-horse-battery-staple";
    @Autowired MockMvc mvc;
    @Autowired ObjectMapper mapper;
    @Autowired MemberRepository members;
    @Autowired AssessmentRepository assessments;
    @Autowired PasswordEncoder passwordEncoder;

    @BeforeEach void clean() { assessments.deleteAll(); members.deleteAll(); }

    @Test void namesAreRequiredAndBlankOrLongNamesDoNotCreateAccounts() throws Exception {
        for (String name : new String[]{"", "   ", "x".repeat(101)}) {
            mvc.perform(csrf(post("/api/auth/register"), null).contentType(MediaType.APPLICATION_JSON)
                    .content(registration("invalid@example.test", name, "Johnston")))
                    .andExpect(status().isUnprocessableEntity())
                    .andExpect(jsonPath("$.fieldErrors.firstName").exists());
        }
        mvc.perform(csrf(post("/api/auth/register"), null).contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(Map.of("email", "missing@example.test", "password", PASSWORD,
                        "ageEligibilityConfirmed", true, "termsAccepted", true))))
                .andExpect(status().isUnprocessableEntity());
        assertThat(members.count()).isZero();
    }

    @Test void nameIsTrimmedPersistedAndReturnedAfterANewLogin() throws Exception {
        MockHttpSession session = register("name@example.test", "  Elijah  ", " Johnston ");
        mvc.perform(get("/api/auth/me").session(session))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.firstName").value("Elijah"))
                .andExpect(jsonPath("$.lastName").value("Johnston"))
                .andExpect(jsonPath("$.passwordHash").doesNotExist());
        mvc.perform(csrf(post("/api/auth/logout"), session)).andExpect(status().isOk());
        mvc.perform(csrf(post("/api/auth/login"), null).contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(Map.of("email", "name@example.test", "password", PASSWORD))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.firstName").value("Elijah"))
                .andExpect(jsonPath("$.lastName").value("Johnston"));
    }

    @Test void readsOnlyTheSignedInMembersSavedAnswersAfterANewLogin() throws Exception {
        MockHttpSession owner = register("owner@example.test", "Owner", "Member");
        mvc.perform(csrf(post("/api/assessment"), owner).contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(Map.of("formVersion", 1, "submissionId", UUID.randomUUID(),
                        "answers", Map.of("sleep_problems", Map.of("status", "CONCERN"))))))
                .andExpect(status().isCreated());
        mvc.perform(csrf(post("/api/auth/logout"), owner)).andExpect(status().isOk());
        var login = mvc.perform(csrf(post("/api/auth/login"), null).contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(Map.of("email", "owner@example.test", "password", PASSWORD))))
                .andExpect(status().isOk()).andReturn();
        MockHttpSession newSession = (MockHttpSession) login.getRequest().getSession(false);
        mvc.perform(get("/api/assessment").session(newSession))
                .andExpect(status().isOk())
                .andExpect(header().string("Cache-Control", "no-store"))
                .andExpect(jsonPath("$.formVersion").value(1))
                .andExpect(jsonPath("$.completedAt").isNotEmpty())
                .andExpect(jsonPath("$.answers.sleep_problems.status").value("CONCERN"))
                .andExpect(jsonPath("$.answers.diet_and_nutrition.status").value("SKIPPED"));

        UUID ownerId = members.findByEmailIgnoreCase("owner@example.test").orElseThrow().getId();
        MockHttpSession other = register("other@example.test", "Other", "Member");
        mvc.perform(get("/api/assessment").param("memberId", ownerId.toString()).session(other))
                .andExpect(status().isNoContent()).andExpect(content().string(""));
        mvc.perform(get("/api/assessment")).andExpect(status().isUnauthorized());
        assertThat(assessments.count()).isEqualTo(1);
    }

    @Test void anAllSkippedAssessmentIsRestoredAsCompleted() throws Exception {
        MockHttpSession session = register("skipped@example.test", "Skip", "Member");
        mvc.perform(csrf(post("/api/assessment"), session).contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(Map.of("formVersion", 1, "submissionId", UUID.randomUUID(),
                        "answers", Map.of())))).andExpect(status().isCreated());
        mvc.perform(get("/api/assessment").session(session)).andExpect(status().isOk())
                .andExpect(jsonPath("$.completedAt").isNotEmpty())
                .andExpect(jsonPath("$.answers.sleep_problems.status").value("SKIPPED"));
    }

    @Test void accountsCreatedBeforeNamesWereCollectedCanStillSignIn() throws Exception {
        Instant now = Instant.now();
        members.saveAndFlush(new Member(UUID.randomUUID(), "legacy@example.test", null, null,
                passwordEncoder.encode(PASSWORD), now, now, "v1", now));
        mvc.perform(csrf(post("/api/auth/login"), null).contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(Map.of("email", "legacy@example.test", "password", PASSWORD))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("legacy@example.test"));
    }

    private MockHttpSession register(String email, String firstName, String lastName) throws Exception {
        var result = mvc.perform(csrf(post("/api/auth/register"), null).contentType(MediaType.APPLICATION_JSON)
                .content(registration(email, firstName, lastName)))
                .andExpect(status().isCreated()).andReturn();
        return (MockHttpSession) result.getRequest().getSession(false);
    }

    private String registration(String email, String firstName, String lastName) throws Exception {
        return mapper.writeValueAsString(Map.of("email", email, "password", PASSWORD, "firstName", firstName,
                "lastName", lastName, "ageEligibilityConfirmed", true, "termsAccepted", true));
    }

    private MockHttpServletRequestBuilder csrf(MockHttpServletRequestBuilder request, MockHttpSession session)
            throws Exception {
        var tokenRequest = get("/api/auth/csrf");
        if (session != null) tokenRequest.session(session);
        Cookie cookie = mvc.perform(tokenRequest).andExpect(status().isOk())
                .andReturn().getResponse().getCookie("XSRF-TOKEN");
        assertThat(cookie).isNotNull();
        request.cookie(cookie).header("X-XSRF-TOKEN", cookie.getValue());
        if (session != null) request.session(session);
        return request;
    }
}
