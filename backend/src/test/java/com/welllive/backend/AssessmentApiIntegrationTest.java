package com.welllive.backend;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.welllive.backend.assessment.AnswerStatus;
import com.welllive.backend.assessment.AssessmentAnswer;
import com.welllive.backend.assessment.AssessmentResponse;
import com.welllive.backend.assessment.AssessmentSubmission;
import com.welllive.backend.assessment.AssessmentService;
import com.welllive.backend.repository.AssessmentRepository;
import com.welllive.backend.repository.MemberRepository;
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
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;

import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource(properties = {
        "app.assessment.encryption-key=MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTIzNDU2Nzg5MDE=",
        "app.security.allowed-origin=http://localhost:8100"
})
class AssessmentApiIntegrationTest {
    private static final String EMAIL = "member@example.test";
    private static final String PASSWORD = "correct-horse-battery-staple";

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private MemberRepository members;

    @Autowired
    private AssessmentRepository assessments;

    @Autowired
    private AssessmentService assessmentService;

    @BeforeEach
    void cleanDatabase() {
        assessments.deleteAll();
        members.deleteAll();
    }

    @Test
    void assessmentRequiresAuthenticationAndReturnsTheFixedForm() throws Exception {
        mockMvc.perform(get("/api/assessment/form"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.code").value("UNAUTHENTICATED"));

        MockHttpSession session = registerMember();
        mockMvc.perform(get("/api/assessment/form").session(session))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.version").value(1))
                .andExpect(jsonPath("$.sections[0].id").value("review_of_systems"))
                .andExpect(jsonPath("$.sections[0].items[0].inputType").value("NUMBER"))
                .andExpect(jsonPath("$.sections[0].items[4].inputType").value("INTEGER"))
                .andExpect(jsonPath("$.sections[1].items[0].id").value("memory_difficulties"))
                .andExpect(jsonPath("$.sections[1].items[0].options[0].label").value("Concern"))
                .andExpect(jsonPath("$.sections[1].items[0].options[1].label").value("No concern"))
                .andExpect(jsonPath("$.sections[1].items[0].options[2].label").value("Skip"))
                .andExpect(jsonPath("$.sections[1].items[0].options[3].label").value("Others"))
                .andExpect(jsonPath("$.sections[1].items[0].options[3].requiresShortAnswer").value(true));
    }

    @Test
    void othersRequiresShortAnswerAndStoresItEncrypted() throws Exception {
        MockHttpSession session = registerMember();
        UUID submissionId = UUID.randomUUID();
        String request = """
                {
                  "formVersion": 1,
                  "submissionId": "%s",
                  "answers": {
                    "age": { "value": "34" },
                    "memory_difficulties": { "status": "OTHER", "value": "Occasional confusion" }
                  }
                }
                """.formatted(submissionId);

        mockMvc.perform(withCsrf(post("/api/assessment")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(request), session))
                .andExpect(status().isCreated());

        UUID memberId = members.findByEmailIgnoreCase(EMAIL).orElseThrow().getId();
        String encryptedValue = new String(assessments.findByMemberId(memberId).orElseThrow()
                .getEncryptedAnswers(), StandardCharsets.UTF_8);
        assertThat(encryptedValue).doesNotContain("Occasional confusion");
        assertThat(assessments.count()).isEqualTo(1);
    }

    @Test
    void othersWithoutShortAnswerIsRejectedWithoutSaving() throws Exception {
        MockHttpSession session = registerMember();
        String request = """
                {
                  "formVersion": 1,
                  "submissionId": "%s",
                  "answers": {
                    "memory_difficulties": { "status": "OTHER" }
                  }
                }
                """.formatted(UUID.randomUUID());

        mockMvc.perform(withCsrf(post("/api/assessment")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(request), session))
                .andExpect(status().isUnprocessableEntity())
                .andExpect(jsonPath("$.fieldErrors['answers.memory_difficulties.value']").exists());
        assertThat(assessments.count()).isZero();
    }

    @Test
    void browserSessionBootstrapRequiresAndAcceptsCsrfCookieAndHeader() throws Exception {
        MvcResult csrfResult = mockMvc.perform(get("/api/auth/csrf"))
                .andExpect(status().isOk())
                .andReturn();
        JsonNode csrf = objectMapper.readTree(csrfResult.getResponse().getContentAsString());
        Cookie csrfCookie = csrfResult.getResponse().getCookie("XSRF-TOKEN");
        assertThat(csrfCookie).isNotNull();

        mockMvc.perform(post("/api/auth/register")
                        .cookie(csrfCookie)
                        .header(csrf.get("headerName").asText(), csrfCookie.getValue())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "email": "csrf@example.test",
                                  "password": "correct-horse-battery-staple",
                                  "ageEligibilityConfirmed": true,
                                  "termsAccepted": true
                                }
                                """))
                .andExpect(status().isCreated());
    }

    @Test
    void completionIsEncryptedAtomicAndIdempotentForAnEquivalentRetry() throws Exception {
        MockHttpSession session = registerMember();
        UUID submissionId = UUID.randomUUID();
        String initialRequest = assessmentRequest(submissionId, "Optional private detail", "34");

        MvcResult first = mockMvc.perform(withCsrf(post("/api/assessment")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(initialRequest), session))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.formVersion").value(1))
                .andReturn();

        JsonNode firstResponse = objectMapper.readTree(first.getResponse().getContentAsString());
        JsonNode memberResponse = objectMapper.readTree(mockMvc.perform(get("/api/auth/me").session(session))
                .andReturn().getResponse().getContentAsString());
        UUID memberId = UUID.fromString(memberResponse.get("memberId").asText());
        var stored = assessments.findByMemberId(memberId).orElseThrow();
        String encryptedValue = new String(stored.getEncryptedAnswers(), StandardCharsets.UTF_8);
        assertThat(encryptedValue).doesNotContain("Optional private detail");

        mockMvc.perform(withCsrf(post("/api/assessment")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(initialRequest), session))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.completedAt").value(firstResponse.get("completedAt").asText()));

        mockMvc.perform(withCsrf(post("/api/assessment")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(assessmentRequest(submissionId, "Changed private detail", "34")), session))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.code").value("SUBMISSION_ID_REUSED"));

        mockMvc.perform(withCsrf(post("/api/assessment")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(assessmentRequest(UUID.randomUUID(), "Optional private detail", "34")), session))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.code").value("ASSESSMENT_EXISTS"));
        assertThat(assessments.count()).isEqualTo(1);
    }

    @Test
    void rejectsUnsupportedVersionsAndInvalidValuesWithoutSaving() throws Exception {
        MockHttpSession session = registerMember();
        UUID submissionId = UUID.randomUUID();
        mockMvc.perform(withCsrf(post("/api/assessment")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"formVersion\":2,\"submissionId\":\"" + submissionId
                                + "\",\"answers\":{}}"), session))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.code").value("FORM_CHANGED"));

        mockMvc.perform(withCsrf(post("/api/assessment")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(assessmentRequest(UUID.randomUUID(), null, "151")), session))
                .andExpect(status().isUnprocessableEntity())
                .andExpect(jsonPath("$.code").value("VALIDATION_FAILED"));
        assertThat(assessments.count()).isZero();
    }

    @Test
    void sectionValidationChecksOwnershipWithoutPersistingPendingAnswers() throws Exception {
        MockHttpSession session = registerMember();
        String request = """
                {
                  "formVersion": 1,
                  "sectionId": "physical_concerns",
                  "answers": {
                    "pain": { "status": "NO_CONCERN" }
                  }
                }
                """;
        mockMvc.perform(withCsrf(post("/api/assessment/section-validations")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(request), session))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.valid").value(true));
        assertThat(assessments.count()).isZero();

        String wrongSection = """
                {
                  "formVersion": 1,
                  "sectionId": "physical_concerns",
                  "answers": {
                    "age": { "value": "34" }
                  }
                }
                """;
        mockMvc.perform(withCsrf(post("/api/assessment/section-validations")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(wrongSection), session))
                .andExpect(status().isUnprocessableEntity())
                .andExpect(jsonPath("$.code").value("VALIDATION_FAILED"));
        assertThat(assessments.count()).isZero();
    }

    @Test
    void concurrentRetriesWithTheSameSubmissionIdReconcileToOneAssessment() throws Exception {
        registerMember();
        UUID memberId = members.findByEmailIgnoreCase(EMAIL).orElseThrow().getId();
        AssessmentSubmission submission = new AssessmentSubmission(1, UUID.randomUUID(),
                Map.of("pain", new AssessmentAnswer(AnswerStatus.NO_CONCERN, null, null, null)), Map.of());
        CountDownLatch ready = new CountDownLatch(2);
        CountDownLatch start = new CountDownLatch(1);

        try (ExecutorService executor = Executors.newFixedThreadPool(2)) {
            Future<AssessmentResponse> first = executor.submit(() -> {
                ready.countDown();
                start.await();
                return assessmentService.complete(memberId, submission);
            });
            Future<AssessmentResponse> second = executor.submit(() -> {
                ready.countDown();
                start.await();
                return assessmentService.complete(memberId, submission);
            });
            assertThat(ready.await(5, TimeUnit.SECONDS)).isTrue();
            start.countDown();
            AssessmentResponse firstResponse = first.get(10, TimeUnit.SECONDS);
            AssessmentResponse secondResponse = second.get(10, TimeUnit.SECONDS);
            assertThat(firstResponse).isEqualTo(secondResponse);
            assertThat(assessments.count()).isEqualTo(1);
        }
    }

    private MockHttpSession registerMember() throws Exception {
        String request = """
                {
                  "email": "%s",
                  "password": "%s",
                  "ageEligibilityConfirmed": true,
                  "termsAccepted": true
                }
                """.formatted(EMAIL, PASSWORD);
        MvcResult result = mockMvc.perform(withCsrf(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(request), null))
                .andExpect(status().isCreated())
                .andReturn();
        assertThat(members.findByEmailIgnoreCase(EMAIL)).isPresent();
        return (MockHttpSession) result.getRequest().getSession(false);
    }

    private MockHttpServletRequestBuilder withCsrf(
            MockHttpServletRequestBuilder request,
            MockHttpSession session) throws Exception {
        Cookie cookie = csrfCookieFor(session);
        request.cookie(cookie).header("X-XSRF-TOKEN", cookie.getValue());
        if (session != null) {
            request.session(session);
        }
        return request;
    }

    private Cookie csrfCookieFor(MockHttpSession session) throws Exception {
        MockHttpServletRequestBuilder request = get("/api/auth/csrf");
        if (session != null) {
            request.session(session);
        }
        MvcResult result = mockMvc.perform(request).andExpect(status().isOk()).andReturn();
        Cookie cookie = result.getResponse().getCookie("XSRF-TOKEN");
        assertThat(cookie).isNotNull();
        return cookie;
    }

    private static String assessmentRequest(UUID submissionId, String detail, String age) {
        String followUp = detail == null ? "" : ",\"followUpText\":\"" + detail + "\"";
        return """
                {
                  "formVersion": 1,
                  "submissionId": "%s",
                  "answers": {
                    "age": { "value": "%s" },
                    "skin_or_nail_changes": { "status": "CONCERN"%s },
                    "pain": { "status": "NO_CONCERN" }
                  }
                }
                """.formatted(submissionId, age, followUp);
    }
}
