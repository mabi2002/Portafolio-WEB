package com.MiguelAngelBarraza.Portafolio.controller;

import com.MiguelAngelBarraza.Portafolio.model.Education;
import com.MiguelAngelBarraza.Portafolio.repository.EducationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/education")
public class EducationRestController {

    @Autowired
    private EducationRepository educationRepository;

    @GetMapping
    public ResponseEntity<List<Education>> getAllEducation() {
        List<Education> education = educationRepository.findAllByOrderBySortOrderAsc();
        return ResponseEntity.ok(education);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Education> getEducationById(@PathVariable Long id) {
        return educationRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Education> createEducation(@RequestBody Education education) {
        Education saved = educationRepository.save(education);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Education> updateEducation(@PathVariable Long id, @RequestBody Education education) {
        return educationRepository.findById(id)
                .map(existing -> {
                    education.setId(id);
                    Education updated = educationRepository.save(education);
                    return ResponseEntity.ok(updated);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEducation(@PathVariable Long id) {
        educationRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
