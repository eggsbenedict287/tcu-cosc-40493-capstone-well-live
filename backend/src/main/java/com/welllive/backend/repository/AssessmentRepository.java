package com.welllive.backend.repository;

import com.welllive.backend.domain.Assessment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface AssessmentRepository extends JpaRepository<Assessment, UUID> {
    Optional<Assessment> findByMemberId(UUID memberId);
}
