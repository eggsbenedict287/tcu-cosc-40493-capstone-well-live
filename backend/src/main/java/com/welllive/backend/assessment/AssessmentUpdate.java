package com.welllive.backend.assessment;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import java.util.Map;
import java.util.UUID;

public record AssessmentUpdate(
        int formVersion,
        @NotNull UUID updateId,
        @NotNull @Min(0) Long expectedRevision,
        @NotNull Map<String, AssessmentAnswer> answers,
        Map<String, String> sectionFollowUps,
        boolean confirmClearAll) {
}
