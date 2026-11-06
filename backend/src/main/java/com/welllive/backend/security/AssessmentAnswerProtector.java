package com.welllive.backend.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.Cipher;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.security.GeneralSecurityException;
import java.security.SecureRandom;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.Base64;
import java.util.UUID;

@Component
public class AssessmentAnswerProtector {
    private static final int IV_LENGTH_BYTES = 12;
    private static final int TAG_LENGTH_BITS = 128;
    private final SecretKeySpec key;
    private final SecureRandom secureRandom = new SecureRandom();

    public AssessmentAnswerProtector(@Value("${app.assessment.encryption-key}") String encodedKey) {
        try {
            byte[] rawKey = Base64.getDecoder().decode(encodedKey);
            if (rawKey.length != 32) {
                throw new IllegalArgumentException("Assessment encryption key must decode to 32 bytes");
            }
            this.key = new SecretKeySpec(rawKey, "AES");
            Arrays.fill(rawKey, (byte) 0);
        } catch (IllegalArgumentException exception) {
            throw new IllegalStateException("Assessment encryption key must be a Base64-encoded 32-byte key");
        }
    }

    public byte[] encrypt(UUID memberId, byte[] plaintext) {
        byte[] iv = new byte[IV_LENGTH_BYTES];
        secureRandom.nextBytes(iv);
        try {
            Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
            cipher.init(Cipher.ENCRYPT_MODE, key, new GCMParameterSpec(TAG_LENGTH_BITS, iv));
            cipher.updateAAD(memberId.toString().getBytes(StandardCharsets.UTF_8));
            byte[] ciphertext = cipher.doFinal(plaintext);
            byte[] result = Arrays.copyOf(iv, iv.length + ciphertext.length);
            System.arraycopy(ciphertext, 0, result, iv.length, ciphertext.length);
            return result;
        } catch (GeneralSecurityException exception) {
            throw new IllegalStateException("Could not protect assessment data", exception);
        }
    }

    public byte[] decrypt(UUID memberId, byte[] protectedData) {
        if (protectedData.length <= IV_LENGTH_BYTES) {
            throw new IllegalStateException("Stored assessment data is invalid");
        }
        byte[] iv = Arrays.copyOfRange(protectedData, 0, IV_LENGTH_BYTES);
        byte[] ciphertext = Arrays.copyOfRange(protectedData, IV_LENGTH_BYTES, protectedData.length);
        try {
            Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
            cipher.init(Cipher.DECRYPT_MODE, key, new GCMParameterSpec(TAG_LENGTH_BITS, iv));
            cipher.updateAAD(memberId.toString().getBytes(StandardCharsets.UTF_8));
            return cipher.doFinal(ciphertext);
        } catch (GeneralSecurityException exception) {
            throw new IllegalStateException("Could not read protected assessment data", exception);
        }
    }
}
