package com.welllive.backend.auth;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
        @NotBlank @Email @Size(max = 320) String email,
        @NotBlank @Size(max = 72) String password,
        @NotNull @AssertTrue(message = "Age eligibility must be confirmed.") Boolean ageEligibilityConfirmed,
        @NotNull @AssertTrue(message = "Terms and the educational disclaimer must be accepted.") Boolean termsAccepted) {
}
