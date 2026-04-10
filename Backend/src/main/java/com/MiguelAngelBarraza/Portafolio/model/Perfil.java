package com.MiguelAngelBarraza.Portafolio.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "perfil")
public class Perfil {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false)
    private String titulo;

    @Column(columnDefinition = "TEXT")
    private String bio;

    @Column
    private String email;

    @Column
    private String telefono;

    @Column
    private String cvUrl;

    @Column
    private String linkedinUrl;

    @Column
    private String githubUrl;

    @Column
    private String fotoUrl;

    @Column(columnDefinition = "TEXT")
    private String experiencia;

    @Column(columnDefinition = "TEXT")
    private String educacion;
}
