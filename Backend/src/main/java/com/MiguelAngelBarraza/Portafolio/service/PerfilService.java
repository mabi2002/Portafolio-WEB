package com.MiguelAngelBarraza.Portafolio.service;

import com.MiguelAngelBarraza.Portafolio.model.Perfil;
import com.MiguelAngelBarraza.Portafolio.repository.PerfilRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PerfilService {

    private final PerfilRepository perfilRepository;

    public Perfil obtenerPerfil() {
        // El perfil principal tiene id = 1
        return perfilRepository.findById(1L).orElse(null);
    }

    public Perfil actualizar(Perfil perfil) {
        return perfilRepository.save(perfil);
    }
}
