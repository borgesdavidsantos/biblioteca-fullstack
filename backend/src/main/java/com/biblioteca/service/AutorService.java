package com.biblioteca.service;

import com.biblioteca.exception.RecursoNaoEncontradoException;
import com.biblioteca.model.Autor;
import com.biblioteca.repository.AutorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AutorService {

    private final AutorRepository repository;

    public List<Autor> listar() {
        return repository.findAll();
    }

    public Autor buscar(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Autor não encontrado: " + id));
    }

    public Autor criar(Autor autor) {
        return repository.save(autor);
    }

    public Autor atualizar(Long id, Autor dados) {
        Autor autor = buscar(id);
        autor.setNome(dados.getNome());
        autor.setNacionalidade(dados.getNacionalidade());
        return repository.save(autor);
    }

    public void deletar(Long id) {
        repository.delete(buscar(id));
    }
}
