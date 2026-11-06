package com.welllive.backend.assessment;

import com.welllive.backend.assessment.AssessmentDefinition.AssessmentSection;
import com.welllive.backend.auth.MemberPrincipal;
import com.welllive.backend.error.ApiException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/assessment")
public class AssessmentController {
    private final AssessmentDefinition definition;
    private final AssessmentService service;
    private final boolean enabled;

    public AssessmentController(
            AssessmentDefinition definition,
            AssessmentService service,
            @Value("${app.assessment.enabled:true}") boolean enabled) {
        this.definition = definition;
        this.service = service;
        this.enabled = enabled;
    }

    @GetMapping("/form")
    public AssessmentForm form() {
        ensureEnabled();
        return new AssessmentForm(definition.version(), definition.explanation(), definition.sections());
    }

    @PostMapping("/section-validations")
    public SectionValidationResponse validateSection(@Valid @RequestBody SectionValidationRequest request) {
        ensureEnabled();
        service.validateSection(request);
        return new SectionValidationResponse(true);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public AssessmentResponse complete(
            @AuthenticationPrincipal MemberPrincipal member,
            @Valid @RequestBody AssessmentSubmission request) {
        ensureEnabled();
        return service.complete(member.memberId(), request);
    }

    private void ensureEnabled() {
        if (!enabled) {
            throw new ApiException(HttpStatus.SERVICE_UNAVAILABLE, "ASSESSMENT_UNAVAILABLE",
                    "Assessment collection is not enabled in this environment.");
        }
    }

    public record AssessmentForm(int version, String explanation, List<AssessmentSection> sections) {
    }
}
