package com.welllive.backend.assessment;

import jakarta.validation.constraints.NotNull;

import java.util.Map;
import java.util.UUID;

public record AssessmentSubmission(
        int formVersion,
        @NotNull UUID submissionId,
        @NotNull Map<String, AssessmentAnswer> answers,
        Map<String, String> sectionFollowUps) {
}
