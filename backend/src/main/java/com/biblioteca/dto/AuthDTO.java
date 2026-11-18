package com.biblioteca.dto;

import jakarta.validation.constraints.NotBlank;

public class AuthDTO {
    
    public record LoginRequest(
            @NotBlank(message = "O login é obrigatório") String login,
            @NotBlank(message = "A senha é obrigatória") String senha
    ) {}

    public record RegisterRequest(
            @NotBlank(message = "O login é obrigatório") String login,
            @NotBlank(message = "A senha é obrigatória") String senha
    ) {}

    public record TokenResponse(
            String token
    ) {}
}
