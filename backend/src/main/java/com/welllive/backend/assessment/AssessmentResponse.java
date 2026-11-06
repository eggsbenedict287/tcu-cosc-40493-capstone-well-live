package com.welllive.backend.assessment;

import java.time.Instant;

public record AssessmentResponse(int formVersion, Instant completedAt) {
}
