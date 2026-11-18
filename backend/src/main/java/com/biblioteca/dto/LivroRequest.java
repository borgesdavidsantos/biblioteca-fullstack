package com.biblioteca.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record LivroRequest(
        @NotBlank(message = "O título é obrigatório") String titulo,
        String isbn,
        Integer anoPublicacao,
        String sinopse,
        @NotNull(message = "O autor é obrigatório") Long autorId
) {}
