package com.MiguelAngelBarraza.Portafolio.controller;

import com.MiguelAngelBarraza.Portafolio.model.WorkExperience;
import com.MiguelAngelBarraza.Portafolio.repository.WorkExperienceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/work-experience")
public class WorkExperienceRestController {

    @Autowired
    private WorkExperienceRepository workExperienceRepository;

    @GetMapping
    public ResponseEntity<List<WorkExperience>> getAllWorkExperience() {
        List<WorkExperience> experiences = workExperienceRepository.findAllByOrderBySortOrderAsc();
        return ResponseEntity.ok(experiences);
    }

    @GetMapping("/{id}")
    public ResponseEntity<WorkExperience> getWorkExperienceById(@PathVariable Long id) {
        return workExperienceRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<WorkExperience> createWorkExperience(@RequestBody WorkExperience workExperience) {
        WorkExperience saved = workExperienceRepository.save(workExperience);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<WorkExperience> updateWorkExperience(@PathVariable Long id, @RequestBody WorkExperience workExperience) {
        return workExperienceRepository.findById(id)
                .map(existing -> {
                    workExperience.setId(id);
                    WorkExperience updated = workExperienceRepository.save(workExperience);
                    return ResponseEntity.ok(updated);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWorkExperience(@PathVariable Long id) {
        workExperienceRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
