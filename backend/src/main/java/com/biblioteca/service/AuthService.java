package com.biblioteca.service;

import com.biblioteca.dto.AuthDTO;
import com.biblioteca.model.Usuario;
import com.biblioteca.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UsuarioRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;

    public void registrar(AuthDTO.RegisterRequest dados) {
        if (repository.findByLogin(dados.login()) != null) {
            throw new IllegalArgumentException("Usuário já existe!");
        }

        Usuario usuario = new Usuario();
        usuario.setLogin(dados.login());
        usuario.setSenha(passwordEncoder.encode(dados.senha())); // Criptografa a senha
        repository.save(usuario);
    }

    public String login(AuthDTO.LoginRequest dados) {
        // Autentica usando o Spring Security
        var authenticationToken = new UsernamePasswordAuthenticationToken(dados.login(), dados.senha());
        var authentication = authenticationManager.authenticate(authenticationToken);

        // Gera o token JWT
        Usuario usuario = (Usuario) authentication.getPrincipal();
        return tokenService.gerarToken(usuario);
    }
}
