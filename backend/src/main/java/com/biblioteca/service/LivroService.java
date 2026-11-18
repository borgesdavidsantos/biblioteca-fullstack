package com.biblioteca.service;

import com.biblioteca.dto.LivroRequest;
import com.biblioteca.exception.RecursoNaoEncontradoException;
import com.biblioteca.model.Livro;
import com.biblioteca.repository.LivroRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LivroService {

    private final LivroRepository repository;
    private final AutorService autorService;

    public List<Livro> listar() {
        return repository.findAll();
    }

    public List<Livro> listarPorAutor(Long autorId) {
        return repository.findByAutorId(autorId);
    }

    public Livro buscar(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Livro não encontrado: " + id));
    }

    public Livro criar(LivroRequest req) {
        return repository.save(preencher(new Livro(), req));
    }

    public Livro atualizar(Long id, LivroRequest req) {
        return repository.save(preencher(buscar(id), req));
    }

    public void deletar(Long id) {
        repository.delete(buscar(id));
    }

    private Livro preencher(Livro livro, LivroRequest req) {
        livro.setTitulo(req.titulo());
        livro.setIsbn(req.isbn());
        livro.setAnoPublicacao(req.anoPublicacao());
        livro.setSinopse(req.sinopse());
        livro.setAutor(autorService.buscar(req.autorId()));
        return livro;
    }
}
