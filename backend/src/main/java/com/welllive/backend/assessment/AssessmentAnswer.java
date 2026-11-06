package com.welllive.backend.assessment;

public record AssessmentAnswer(
        AnswerStatus status,
        String value,
        String unit,
        String followUpText) {
}
