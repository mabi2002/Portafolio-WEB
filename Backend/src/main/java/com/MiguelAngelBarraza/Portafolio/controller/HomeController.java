package com.MiguelAngelBarraza.Portafolio.controller;

import com.MiguelAngelBarraza.Portafolio.model.Proyecto;
import com.MiguelAngelBarraza.Portafolio.service.ProyectoService;
import com.MiguelAngelBarraza.Portafolio.service.PerfilService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
@RequiredArgsConstructor
public class HomeController {

    private final ProyectoService proyectoService;
    private final PerfilService perfilService;

    @GetMapping("/")
    public String index(Model model) {
        model.addAttribute("proyectos", proyectoService.obtenerTodos());
        return "index";
    }

    @GetMapping("/about")
    public String about(Model model) {
        model.addAttribute("perfil", perfilService.obtenerPerfil());
        return "about";
    }

    @GetMapping("/proyecto/{id}")
    public String proyectoDetalle(@PathVariable Long id, Model model) {
        Proyecto proyecto = proyectoService.obtenerPorId(id);
        if (proyecto == null) {
            return "redirect:/";
        }
        model.addAttribute("proyecto", proyecto);
        model.addAttribute("proyectosRelacionados", proyectoService.obtenerTodos());
        return "proyecto-detalle";
    }
}
