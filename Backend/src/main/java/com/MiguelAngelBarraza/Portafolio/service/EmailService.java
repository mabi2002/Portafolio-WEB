package com.MiguelAngelBarraza.Portafolio.service;

import com.MiguelAngelBarraza.Portafolio.model.Mensaje;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.from:noreply@portafolio.com}")
    private String fromEmail;

    @Value("${app.owner.email:owner@ejemplo.com}")
    private String ownerEmail;

    public void enviarCorreoContacto(Mensaje mensaje) {
        try {
            // Email al dueño del portafolio
            enviarEmailPropietario(mensaje);
            // Email de confirmación al usuario
            enviarEmailConfirmacion(mensaje);
        } catch (MessagingException e) {
            log.error("Error enviando email para mensaje de contacto: {}", mensaje.getId(), e);
        }
    }

    private void enviarEmailPropietario(Mensaje mensaje) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

        String htmlContent = construirHtmlPropietario(mensaje);

        helper.setFrom(fromEmail);
        helper.setTo(ownerEmail);
        helper.setSubject("Nuevo mensaje de contacto: " + mensaje.getAsunto());
        helper.setText(htmlContent, true);

        mailSender.send(mimeMessage);
        log.info("Email enviado al propietario para mensaje de contacto ID: {}", mensaje.getId());
    }

    private void enviarEmailConfirmacion(Mensaje mensaje) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

        String htmlContent = construirHtmlConfirmacion(mensaje);

        helper.setFrom(fromEmail);
        helper.setTo(mensaje.getEmail());
        helper.setSubject("Hemos recibido tu mensaje");
        helper.setText(htmlContent, true);

        mailSender.send(mimeMessage);
        log.info("Email de confirmación enviado a: {}", mensaje.getEmail());
    }

    private String construirHtmlPropietario(Mensaje mensaje) {
        return """
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <style>
                    body { font-family: Arial, sans-serif; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 20px; border-radius: 8px; }
                    .content { padding: 20px; background: #f3f4f6; border-radius: 8px; margin: 20px 0; }
                    .footer { text-align: center; color: #6b7280; font-size: 12px; margin-top: 20px; }
                    .field { margin: 15px 0; }
                    .label { font-weight: bold; color: #1f2937; }
                    .value { color: #4b5563; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h2>📧 Nuevo Mensaje de Contacto</h2>
                    </div>

                    <div class="content">
                        <div class="field">
                            <span class="label">Nombre:</span>
                            <p class="value">""" + mensaje.getNombre() + """
</p>
                        </div>

                        <div class="field">
                            <span class="label">Email:</span>
                            <p class="value"><a href="mailto:""" + mensaje.getEmail() + """
">""" + mensaje.getEmail() + """
</a></p>
                        </div>

                        <div class="field">
                            <span class="label">Asunto:</span>
                            <p class="value">""" + mensaje.getAsunto() + """
</p>
                        </div>

                        <div class="field">
                            <span class="label">Mensaje:</span>
                            <p class="value">""" + mensaje.getMensaje().replace("\n", "<br>") + """
</p>
                        </div>

                        <div class="field">
                            <span class="label">Fecha:</span>
                            <p class="value">""" + mensaje.getFechaCreacion() + """
</p>
                        </div>
                    </div>

                    <div class="footer">
                        <p>Este es un mensaje automático. No responda a este email.</p>
                    </div>
                </div>
            </body>
            </html>
            """;
    }

    private String construirHtmlConfirmacion(Mensaje mensaje) {
        return """
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <style>
                    body { font-family: Arial, sans-serif; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 20px; border-radius: 8px; text-align: center; }
                    .content { padding: 20px; background: #f3f4f6; border-radius: 8px; margin: 20px 0; }
                    .footer { text-align: center; color: #6b7280; font-size: 12px; margin-top: 20px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h2>✓ Mensaje Recibido</h2>
                    </div>

                    <div class="content">
                        <p>Hola <strong>""" + mensaje.getNombre() + """
</strong>,</p>

                        <p>Gracias por contactarme. He recibido tu mensaje correctamente.</p>

                        <p><strong>Resumen de tu mensaje:</strong></p>
                        <ul>
                            <li><strong>Asunto:</strong> """ + mensaje.getAsunto() + """
</li>
                            <li><strong>Fecha:</strong> """ + mensaje.getFechaCreacion() + """
</li>
                        </ul>

                        <p>Te responderé lo antes posible. Gracias por tu interés.</p>
                    </div>

                    <div class="footer">
                        <p>Este es un mensaje automático. No responda a este email.</p>
                        <p>© 2024 Portafolio. Todos los derechos reservados.</p>
                    </div>
                </div>
            </body>
            </html>
            """;
    }
}
