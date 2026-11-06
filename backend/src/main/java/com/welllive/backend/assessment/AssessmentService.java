package com.welllive.backend.assessment;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.welllive.backend.assessment.AssessmentDefinition.AssessmentItem;
import com.welllive.backend.assessment.AssessmentDefinition.AssessmentSection;
import com.welllive.backend.assessment.AssessmentDefinition.InputType;
import com.welllive.backend.domain.Assessment;
import com.welllive.backend.error.ApiException;
import com.welllive.backend.repository.AssessmentRepository;
import com.welllive.backend.repository.MemberRepository;
import com.welllive.backend.security.AssessmentAnswerProtector;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.io.IOException;
import java.time.Clock;
import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;
import java.util.UUID;

@Service
public class AssessmentService {
    private static final int MAX_TEXT_CODE_POINTS = 500;
    private static final Set<String> SECTION_FOLLOW_UPS = Set.of("family_relationship_concerns");
    private final AssessmentDefinition definition;
    private final AssessmentRepository assessments;
    private final MemberRepository members;
    private final AssessmentAnswerProtector protector;
    private final ObjectMapper objectMapper;
    private final Clock clock;

    public AssessmentService(
            AssessmentDefinition definition,
            AssessmentRepository assessments,
            MemberRepository members,
            AssessmentAnswerProtector protector,
            ObjectMapper objectMapper,
            Clock clock) {
        this.definition = definition;
        this.assessments = assessments;
        this.members = members;
        this.protector = protector;
        this.objectMapper = objectMapper;
        this.clock = clock;
    }

    public void validateSection(SectionValidationRequest request) {
        checkVersion(request.formVersion());
        AssessmentSection section = definition.findSection(request.sectionId())
                .orElseThrow(() -> new ApiException(HttpStatus.UNPROCESSABLE_ENTITY, "VALIDATION_FAILED",
                        "The selected section is invalid.", Map.of("sectionId", "Unknown section.")));
        normalize(request.answers(), request.sectionFollowUps(), section.id());
    }

    @Transactional
    public AssessmentResponse complete(UUID memberId, AssessmentSubmission request) {
        checkVersion(request.formVersion());
        members.findByIdForUpdate(memberId)
                .orElseThrow(() -> new ApiException(HttpStatus.UNAUTHORIZED, "UNAUTHENTICATED",
                        "Sign in is required."));

        NormalizedAssessment normalized = normalize(request.answers(), request.sectionFollowUps(), null);
        Assessment existing = assessments.findByMemberId(memberId).orElse(null);
        if (existing != null) {
            if (existing.getSubmissionId().equals(request.submissionId())) {
                if (readStoredAnswers(memberId, existing).equals(normalized)) {
                    return new AssessmentResponse(existing.getFormVersion(), existing.getCompletedAt());
                }
                throw new ApiException(HttpStatus.CONFLICT, "SUBMISSION_ID_REUSED",
                        "This submission identifier was already used with different answers.");
            }
            throw new ApiException(HttpStatus.CONFLICT, "ASSESSMENT_EXISTS",
                    "An assessment has already been completed for this account.");
        }

        Instant completedAt = clock.instant();
        assessments.saveAndFlush(new Assessment(memberId, definition.version(), request.submissionId(),
                protect(memberId, normalized), completedAt));
        return new AssessmentResponse(definition.version(), completedAt);
    }

    private NormalizedAssessment normalize(
            Map<String, AssessmentAnswer> providedAnswers,
            Map<String, String> providedFollowUps,
            String onlySection) {
        Map<String, AssessmentAnswer> answers = providedAnswers == null ? Map.of() : providedAnswers;
        Map<String, String> sectionFollowUps = providedFollowUps == null ? Map.of() : providedFollowUps;
        Map<String, String> errors = new LinkedHashMap<>();
        Set<String> allowedItemIds = onlySection == null
                ? definition.items().keySet()
                : definition.findSection(onlySection).orElseThrow().items().stream()
                        .map(AssessmentItem::id).collect(java.util.stream.Collectors.toUnmodifiableSet());

        for (String id : answers.keySet()) {
            AssessmentItem item = definition.items().get(id);
            if (item == null) {
                errors.put("answers." + id, "Unknown answer field.");
            } else if (!allowedItemIds.contains(id)) {
                errors.put("answers." + id, "Answer does not belong to the selected section.");
            }
        }
        for (String sectionId : sectionFollowUps.keySet()) {
            if (!SECTION_FOLLOW_UPS.contains(sectionId)) {
                errors.put("sectionFollowUps." + sectionId, "Unknown section follow-up.");
            } else if (onlySection != null && !onlySection.equals(sectionId)) {
                errors.put("sectionFollowUps." + sectionId, "Follow-up does not belong to the selected section.");
            }
        }
        if (!errors.isEmpty()) {
            throw validationException(errors);
        }

        TreeMap<String, AssessmentAnswer> normalizedAnswers = new TreeMap<>();
        for (AssessmentSection section : definition.sections()) {
            if (onlySection != null && !onlySection.equals(section.id())) {
                continue;
            }
            for (AssessmentItem item : section.items()) {
                normalizedAnswers.put(item.id(), normalizeAnswer(item, answers.get(item.id()), errors));
            }
        }

        TreeMap<String, String> normalizedFollowUps = new TreeMap<>();
        for (String sectionId : SECTION_FOLLOW_UPS) {
            if (onlySection != null && !onlySection.equals(sectionId)) {
                continue;
            }
            String text = trimToNull(sectionFollowUps.get(sectionId));
            boolean hasConcern = definition.findSection(sectionId).orElseThrow().items().stream()
                    .map(item -> normalizedAnswers.get(item.id()))
                    .anyMatch(answer -> answer != null && answer.status() == AnswerStatus.CONCERN);
            if (text != null && text.codePointCount(0, text.length()) > MAX_TEXT_CODE_POINTS) {
                errors.put("sectionFollowUps." + sectionId, "Text must be 500 characters or fewer.");
            } else if (text != null && hasConcern) {
                normalizedFollowUps.put(sectionId, text);
            }
        }
        if (!errors.isEmpty()) {
            throw validationException(errors);
        }
        return new NormalizedAssessment(normalizedAnswers, normalizedFollowUps);
    }

    private AssessmentAnswer normalizeAnswer(
            AssessmentItem item,
            AssessmentAnswer answer,
            Map<String, String> errors) {
        String field = "answers." + item.id();
        if (answer == null) {
            return new AssessmentAnswer(AnswerStatus.SKIPPED, null, null, null);
        }

        if (item.inputType() == InputType.CONCERN) {
            if (answer.status() == null) {
                errors.put(field + ".status", "Choose Concern, No concern, Skip, or Others.");
                return new AssessmentAnswer(AnswerStatus.SKIPPED, null, null, null);
            }
            if (answer.unit() != null) {
                errors.put(field + ".unit", "This answer does not accept a unit.");
            }
            String value = trimToNull(answer.value());
            if (answer.status() == AnswerStatus.OTHER) {
                if (answer.followUpText() != null) {
                    errors.put(field + ".followUpText", "Use the short answer field for Others.");
                }
                if (value == null) {
                    errors.put(field + ".value", "Enter a short answer for Others.");
                } else if (value.codePointCount(0, value.length()) > MAX_TEXT_CODE_POINTS) {
                    errors.put(field + ".value", "Text must be 500 characters or fewer.");
                }
                return new AssessmentAnswer(AnswerStatus.OTHER, value, null, null);
            }
            if (value != null) {
                errors.put(field + ".value", "This answer does not accept a value.");
            }
            String followUp = trimToNull(answer.followUpText());
            if (followUp != null && item.followUpPrompt() == null) {
                errors.put(field + ".followUpText", "This answer does not have a follow-up prompt.");
            }
            if (followUp != null && followUp.codePointCount(0, followUp.length()) > MAX_TEXT_CODE_POINTS) {
                errors.put(field + ".followUpText", "Text must be 500 characters or fewer.");
            }
            if (followUp != null && (answer.status() != AnswerStatus.CONCERN || item.followUpPrompt() == null)) {
                followUp = null;
            }
            return new AssessmentAnswer(answer.status(), null, null, followUp);
        }

        if (answer.status() != null && answer.status() != AnswerStatus.SKIPPED) {
            errors.put(field + ".status", "This answer uses a value rather than a concern response.");
        }
        if (answer.followUpText() != null) {
            errors.put(field + ".followUpText", "This answer does not accept follow-up text.");
        }
        String value = trimToNull(answer.value());
        if (value == null) {
            if (answer.unit() != null) {
                errors.put(field + ".unit", "A unit requires an answer value.");
            }
            return new AssessmentAnswer(AnswerStatus.SKIPPED, null, null, null);
        }
        if (value.codePointCount(0, value.length()) > MAX_TEXT_CODE_POINTS) {
            errors.put(field + ".value", "Text must be 500 characters or fewer.");
            return new AssessmentAnswer(AnswerStatus.SKIPPED, null, null, null);
        }
        if (item.inputType() == InputType.INTEGER) {
            try {
                int integer = Integer.parseInt(value);
                String[] bounds = item.validationHint().split("\\.\\.");
                int minimum = Integer.parseInt(bounds[0]);
                int maximum = Integer.parseInt(bounds[1]);
                if (integer < minimum || integer > maximum) {
                    errors.put(field + ".value", "Value must be between " + minimum + " and " + maximum + ".");
                } else {
                    value = Integer.toString(integer);
                }
            } catch (NumberFormatException exception) {
                errors.put(field + ".value", "Enter a whole number.");
            }
        } else if (item.inputType() == InputType.NUMBER) {
            try {
                BigDecimal number = new BigDecimal(value);
                BigDecimal normalizedNumber = number.stripTrailingZeros();
                long integerDigits = Math.max(0L, (long) normalizedNumber.precision() - normalizedNumber.scale());
                if (integerDigits > 10) {
                    errors.put(field + ".value", "Value is too large.");
                }
                if (number.signum() <= 0) {
                    errors.put(field + ".value", "Value must be greater than zero.");
                }
                if (normalizedNumber.scale() > 2) {
                    errors.put(field + ".value", "Value must have at most 2 decimal places.");
                }
                if (answer.unit() == null || !item.units().contains(answer.unit())) {
                    errors.put(field + ".unit", "Choose a supported unit.");
                }
                if (integerDigits <= 10 && normalizedNumber.scale() <= 2 && number.signum() > 0) {
                    value = number.setScale(Math.min(Math.max(number.scale(), 0), 2), RoundingMode.UNNECESSARY)
                            .toPlainString();
                }
            } catch (NumberFormatException | ArithmeticException exception) {
                errors.put(field + ".value", "Enter a positive number with at most 2 decimal places.");
            }
        } else if (answer.unit() != null) {
            errors.put(field + ".unit", "This answer does not accept a unit.");
        }
        return new AssessmentAnswer(null, value,
                item.inputType() == InputType.NUMBER ? answer.unit() : null, null);
    }

    private NormalizedAssessment readStoredAnswers(UUID memberId, Assessment assessment) {
        try {
            return objectMapper.readValue(protector.decrypt(memberId, assessment.getEncryptedAnswers()),
                    NormalizedAssessment.class);
        } catch (IOException exception) {
            throw new IllegalStateException("Stored assessment data is invalid", exception);
        }
    }

    private byte[] protect(UUID memberId, NormalizedAssessment answers) {
        try {
            return protector.encrypt(memberId, objectMapper.writeValueAsBytes(answers));
        } catch (JsonProcessingException exception) {
            throw new IllegalStateException("Could not encode assessment data", exception);
        }
    }

    private void checkVersion(int version) {
        if (version != definition.version()) {
            throw new ApiException(HttpStatus.CONFLICT, "FORM_CHANGED",
                    "The questionnaire changed. Reload the form before continuing.");
        }
    }

    private static ApiException validationException(Map<String, String> errors) {
        return new ApiException(HttpStatus.UNPROCESSABLE_ENTITY, "VALIDATION_FAILED",
                "One or more answers are invalid.", errors);
    }

    private static String trimToNull(String value) {
        if (value == null) {
            return null;
        }
        String trimmed = value.strip();
        return trimmed.isEmpty() ? null : trimmed;
    }

    public record NormalizedAssessment(
            TreeMap<String, AssessmentAnswer> answers,
            TreeMap<String, String> sectionFollowUps) {
    }
}
