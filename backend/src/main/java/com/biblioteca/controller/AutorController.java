package com.biblioteca.controller;

import com.biblioteca.model.Autor;
import com.biblioteca.model.Livro;
import com.biblioteca.service.AutorService;
import com.biblioteca.service.LivroService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/autores")
@RequiredArgsConstructor
public class AutorController {

    private final AutorService service;
    private final LivroService livroService;

    @GetMapping
    public List<Autor> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public Autor buscar(@PathVariable Long id) {
        return service.buscar(id);
    }

    @GetMapping("/{id}/livros")
    public List<Livro> livrosDoAutor(@PathVariable Long id) {
        return livroService.listarPorAutor(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Autor criar(@Valid @RequestBody Autor autor) {
        return service.criar(autor);
    }

    @PutMapping("/{id}")
    public Autor atualizar(@PathVariable Long id, @Valid @RequestBody Autor autor) {
        return service.atualizar(id, autor);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletar(@PathVariable Long id) {
        service.deletar(id);
    }
}
