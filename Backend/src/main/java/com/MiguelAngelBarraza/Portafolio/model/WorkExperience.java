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
@Table(name = "work_experience")
public class WorkExperience {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String company;

    @Column(nullable = false)
    private String roleEs;

    @Column
    private String roleEn;

    @Column(columnDefinition = "TEXT")
    private String descriptionEs;

    @Column(name = "description_en", columnDefinition = "TEXT")
    private String descriptionEn;

    @Column
    private String periodEs;

    @Column(name = "period_en")
    private String periodEn;

    @Column(columnDefinition = "TEXT")
    private String technologies;

    @Column(name = "sort_order")
    private Integer sortOrder;
}
