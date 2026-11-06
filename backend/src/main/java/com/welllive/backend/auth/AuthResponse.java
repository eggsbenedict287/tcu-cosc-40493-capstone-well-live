package com.welllive.backend.auth;

import java.util.UUID;

public record AuthResponse(UUID memberId, String email) {
}
