package com.welllive.backend;

import com.welllive.backend.security.AssessmentAnswerProtector;
import org.junit.jupiter.api.Test;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class AssessmentAnswerProtectorTest {
    private static final String KEY = Base64.getEncoder().encodeToString(
            "01234567890123456789012345678901".getBytes(StandardCharsets.UTF_8));

    @Test
    void ciphertextIsBoundToItsOwningMember() {
        AssessmentAnswerProtector protector = new AssessmentAnswerProtector(KEY);
        UUID owner = UUID.randomUUID();
        byte[] plaintext = "synthetic assessment".getBytes(StandardCharsets.UTF_8);
        byte[] protectedData = protector.encrypt(owner, plaintext);

        assertThat(protector.decrypt(owner, protectedData)).isEqualTo(plaintext);
        assertThatThrownBy(() -> protector.decrypt(UUID.randomUUID(), protectedData))
                .isInstanceOf(IllegalStateException.class);
    }
}
