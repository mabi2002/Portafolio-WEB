package com.MiguelAngelBarraza.Portafolio.controller;

import com.MiguelAngelBarraza.Portafolio.model.Proyecto;
import com.MiguelAngelBarraza.Portafolio.service.ProyectoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.CacheControl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/api/proyectos")
public class ProyectoRestController {

    @Autowired
    private ProyectoService proyectoService;

    @GetMapping
    public ResponseEntity<List<Proyecto>> obtenerTodos() {
        return ResponseEntity.ok()
                .cacheControl(CacheControl.maxAge(2, TimeUnit.MINUTES).cachePublic())
                .body(proyectoService.obtenerTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Proyecto> obtenerPorId(@PathVariable Long id) {
        Proyecto proyecto = proyectoService.obtenerPorId(id);
        if (proyecto != null) {
            return ResponseEntity.ok()
                    .cacheControl(CacheControl.maxAge(2, TimeUnit.MINUTES).cachePublic())
                    .body(proyecto);
        }
        return ResponseEntity.notFound().build();
    }
}
