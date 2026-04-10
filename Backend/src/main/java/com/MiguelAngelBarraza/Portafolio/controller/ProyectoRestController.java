package com.MiguelAngelBarraza.Portafolio.controller;

import com.MiguelAngelBarraza.Portafolio.model.Proyecto;
import com.MiguelAngelBarraza.Portafolio.service.ProyectoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/proyectos")
@CrossOrigin(origins = "http://localhost:4200")
public class ProyectoRestController {

    @Autowired
    private ProyectoService proyectoService;

    @GetMapping
    public ResponseEntity<List<Proyecto>> obtenerTodos() {
        return ResponseEntity.ok(proyectoService.obtenerTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Proyecto> obtenerPorId(@PathVariable Long id) {
        Proyecto proyecto = proyectoService.obtenerPorId(id);
        if (proyecto != null) {
            return ResponseEntity.ok(proyecto);
        }
        return ResponseEntity.notFound().build();
    }
}
