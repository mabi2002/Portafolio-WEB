package com.MiguelAngelBarraza.Portafolio.controller;

import com.MiguelAngelBarraza.Portafolio.model.Perfil;
import com.MiguelAngelBarraza.Portafolio.service.PerfilService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/perfil")
@CrossOrigin(origins = "http://localhost:4200")
public class PerfilRestController {

    @Autowired
    private PerfilService perfilService;

    @GetMapping
    public ResponseEntity<Perfil> obtenerPerfil() {
        return ResponseEntity.ok(perfilService.obtenerPerfil());
    }
}
