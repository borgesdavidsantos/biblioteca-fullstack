package com.biblioteca.service;

import com.biblioteca.model.Usuario;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

@Service
public class TokenService {

    // Chave secreta (em produção, usar variável de ambiente)
    private final SecretKey chave = Keys.hmacShaKeyFor("minha-chave-super-secreta-para-o-trabalho-de-frameworks!".getBytes());
    private final long EXPIRACAO = 2 * 60 * 60 * 1000; // 2 horas

    public String gerarToken(Usuario usuario) {
        Date agora = new Date();
        Date expiracao = new Date(agora.getTime() + EXPIRACAO);

        return Jwts.builder()
                .subject(usuario.getLogin())
                .issuedAt(agora)
                .expiration(expiracao)
                .signWith(chave)
                .compact();
    }

    public String validarToken(String token) {
        try {
            Claims claims = Jwts.parser()
                    .verifyWith(chave)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
            return claims.getSubject();
        } catch (Exception e) {
            return null;
        }
    }
}
