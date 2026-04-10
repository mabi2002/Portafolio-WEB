package com.MiguelAngelBarraza.Portafolio.controller;

import com.MiguelAngelBarraza.Portafolio.model.Mensaje;
import com.MiguelAngelBarraza.Portafolio.service.MensajeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ContactoController {

    private final MensajeService mensajeService;

    @PostMapping("/api/contacto")
    public ResponseEntity<?> enviarMensaje(@Valid @RequestBody Mensaje mensaje) {
        try {
            Mensaje saved = mensajeService.guardarMensaje(mensaje);
            return ResponseEntity.ok(new MensajeResponse("success", "Mensaje enviado correctamente. Te responderé pronto."));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MensajeResponse("error", "Error al enviar el mensaje. Intenta de nuevo."));
        }
    }

    record MensajeResponse(String status, String message) {}
}
