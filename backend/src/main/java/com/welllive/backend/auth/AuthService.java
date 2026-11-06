package com.welllive.backend.auth;

import com.welllive.backend.domain.Member;
import com.welllive.backend.error.ApiException;
import com.welllive.backend.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.time.Clock;
import java.time.Instant;
import java.util.Locale;
import java.util.UUID;

@Service
public class AuthService {
    private final MemberRepository members;
    private final PasswordEncoder passwordEncoder;
    private final Clock clock;
    private final String termsVersion;

    public AuthService(
            MemberRepository members,
            PasswordEncoder passwordEncoder,
            Clock clock,
            @Value("${app.security.terms-version}") String termsVersion) {
        this.members = members;
        this.passwordEncoder = passwordEncoder;
        this.clock = clock;
        this.termsVersion = termsVersion;
    }

    @Transactional
    public MemberPrincipal register(RegisterRequest request) {
        if (request.password().getBytes(StandardCharsets.UTF_8).length > 72) {
            throw new ApiException(HttpStatus.UNPROCESSABLE_ENTITY, "VALIDATION_FAILED",
                    "One or more fields are invalid.", java.util.Map.of("password",
                    "Password must not exceed the supported password length."));
        }
        String email = request.email().trim().toLowerCase(Locale.ROOT);
        if (members.existsByEmailIgnoreCase(email)) {
            throw accountConflict();
        }

        Instant now = clock.instant();
        Member member = new Member(UUID.randomUUID(), email, passwordEncoder.encode(request.password()),
                now, now, termsVersion, now);
        try {
            members.saveAndFlush(member);
        } catch (DataIntegrityViolationException exception) {
            throw accountConflict();
        }
        return new MemberPrincipal(member.getId(), member.getEmail(), member.getPasswordHash());
    }

    private static ApiException accountConflict() {
        return new ApiException(HttpStatus.CONFLICT, "ACCOUNT_UNAVAILABLE",
                "The account could not be created with those details.");
    }
}
