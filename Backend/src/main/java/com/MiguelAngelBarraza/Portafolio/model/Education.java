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
@Table(name = "education")
public class Education {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String year;

    @Column(nullable = false)
    private String titleEs;

    @Column
    private String titleEn;

    @Column(nullable = false)
    private String schoolEs;

    @Column
    private String schoolEn;

    @Column(columnDefinition = "TEXT")
    private String textEs;

    @Column(name = "text_en", columnDefinition = "TEXT")
    private String textEn;

    @Column(name = "sort_order")
    private Integer sortOrder;
}
