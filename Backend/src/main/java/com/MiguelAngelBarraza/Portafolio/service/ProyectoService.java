package com.MiguelAngelBarraza.Portafolio.service;

import com.MiguelAngelBarraza.Portafolio.model.Proyecto;
import com.MiguelAngelBarraza.Portafolio.repository.ProyectoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProyectoService {

    private final ProyectoRepository proyectoRepository;

    public List<Proyecto> obtenerTodos() {
        return proyectoRepository.findAllByOrderByFechaCreacionDesc();
    }

    public Proyecto obtenerPorId(Long id) {
        return proyectoRepository.findById(id)
                .orElse(null);
    }

    public Proyecto guardar(Proyecto proyecto) {
        return proyectoRepository.save(proyecto);
    }

    public void eliminar(Long id) {
        proyectoRepository.deleteById(id);
    }
}
