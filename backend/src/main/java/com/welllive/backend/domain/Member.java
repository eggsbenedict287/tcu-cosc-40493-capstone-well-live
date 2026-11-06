package com.welllive.backend.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "members")
public class Member {
    @Id
    private UUID id;

    @Column(name = "email", nullable = false, unique = true, length = 320)
    private String email;

    @Column(name = "password_hash", nullable = false, length = 100)
    private String passwordHash;

    @Column(name = "age_eligibility_confirmed_at", nullable = false)
    private Instant ageEligibilityConfirmedAt;

    @Column(name = "terms_accepted_at", nullable = false)
    private Instant termsAcceptedAt;

    @Column(name = "terms_version", nullable = false, length = 40)
    private String termsVersion;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    protected Member() {
    }

    public Member(
            UUID id,
            String email,
            String passwordHash,
            Instant ageEligibilityConfirmedAt,
            Instant termsAcceptedAt,
            String termsVersion,
            Instant createdAt) {
        this.id = id;
        this.email = email;
        this.passwordHash = passwordHash;
        this.ageEligibilityConfirmedAt = ageEligibilityConfirmedAt;
        this.termsAcceptedAt = termsAcceptedAt;
        this.termsVersion = termsVersion;
        this.createdAt = createdAt;
    }

    public UUID getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getPasswordHash() {
        return passwordHash;
    }
}
