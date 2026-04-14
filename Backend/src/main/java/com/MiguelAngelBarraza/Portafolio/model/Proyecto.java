package com.MiguelAngelBarraza.Portafolio.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "proyectos")
public class Proyecto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String titulo;

    @Column(name = "titulo_en")
    private String tituloEn;

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    @Column(name = "descripcion_en", columnDefinition = "TEXT")
    private String descripcionEn;

    @Column(columnDefinition = "TEXT")
    private String tecnologias;

    @Column
    private String imagenUrl;

    @Column
    private String urlGithub;

    @Column
    private String urlDemo;

    @Column(name = "fecha_creacion", nullable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime fechaCreacion;

    @PrePersist
    protected void onCreate() {
        if (fechaCreacion == null) {
            fechaCreacion = LocalDateTime.now();
        }
    }
}
