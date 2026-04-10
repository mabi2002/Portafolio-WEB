package com.MiguelAngelBarraza.Portafolio.service;

import com.MiguelAngelBarraza.Portafolio.model.Mensaje;
import com.MiguelAngelBarraza.Portafolio.repository.MensajeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MensajeService {

    private final MensajeRepository mensajeRepository;
    private final EmailService emailService;

    public Mensaje guardarMensaje(Mensaje mensaje) {
        Mensaje saved = mensajeRepository.save(mensaje);
        // Enviar email de confirmación
        emailService.enviarCorreoContacto(saved);
        return saved;
    }

    public List<Mensaje> obtenerTodos() {
        return mensajeRepository.findAllByOrderByFechaCreacionDesc();
    }

    public List<Mensaje> obtenerNoLeidos() {
        return mensajeRepository.findByLeidoFalseOrderByFechaCreacionDesc();
    }

    public Mensaje obtenerPorId(Long id) {
        return mensajeRepository.findById(id).orElse(null);
    }

    public Mensaje marcarLeido(Long id) {
        Mensaje mensaje = obtenerPorId(id);
        if (mensaje != null) {
            mensaje.setLeido(true);
            return mensajeRepository.save(mensaje);
        }
        return null;
    }

    public void eliminar(Long id) {
        mensajeRepository.deleteById(id);
    }
}
