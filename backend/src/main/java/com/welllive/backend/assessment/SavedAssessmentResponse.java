package com.welllive.backend.assessment;

import java.time.Instant;
import java.util.Map;

public record SavedAssessmentResponse(
        int formVersion,
        Instant completedAt,
        Instant updatedAt,
        long revision,
        Map<String, AssessmentAnswer> answers,
        Map<String, String> sectionFollowUps) {
}
