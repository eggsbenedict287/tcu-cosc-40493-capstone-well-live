package com.welllive.backend.assessment;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.Map;

public record SectionValidationRequest(
        int formVersion,
        @NotBlank String sectionId,
        @NotNull Map<String, AssessmentAnswer> answers,
        Map<String, String> sectionFollowUps) {
}
