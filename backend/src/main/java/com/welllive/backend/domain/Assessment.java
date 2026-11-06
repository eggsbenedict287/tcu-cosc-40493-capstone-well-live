package com.welllive.backend.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "assessments")
public class Assessment {
    @Id
    @Column(name = "member_id")
    private UUID memberId;

    @Column(name = "form_version", nullable = false)
    private int formVersion;

    @Column(name = "submission_id", nullable = false)
    private UUID submissionId;

    @Column(name = "encrypted_answers", nullable = false)
    private byte[] encryptedAnswers;

    @Column(name = "completed_at", nullable = false)
    private Instant completedAt;

    protected Assessment() {
    }

    public Assessment(UUID memberId, int formVersion, UUID submissionId, byte[] encryptedAnswers, Instant completedAt) {
        this.memberId = memberId;
        this.formVersion = formVersion;
        this.submissionId = submissionId;
        this.encryptedAnswers = encryptedAnswers.clone();
        this.completedAt = completedAt;
    }

    public UUID getSubmissionId() {
        return submissionId;
    }

    public UUID getMemberId() {
        return memberId;
    }

    public int getFormVersion() {
        return formVersion;
    }

    public byte[] getEncryptedAnswers() {
        return encryptedAnswers.clone();
    }

    public Instant getCompletedAt() {
        return completedAt;
    }
}
