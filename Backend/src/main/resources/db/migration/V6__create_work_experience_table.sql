CREATE TABLE work_experience (
    id BIGSERIAL PRIMARY KEY,
    company VARCHAR(255) NOT NULL,
    role_es VARCHAR(255) NOT NULL,
    role_en VARCHAR(255),
    description_es TEXT,
    description_en TEXT,
    period_es VARCHAR(255),
    period_en VARCHAR(255),
    technologies TEXT,
    sort_order INTEGER DEFAULT 0
);

CREATE INDEX idx_sort_order ON work_experience(sort_order);

-- Insert initial data for Caritas
INSERT INTO work_experience (company, role_es, role_en, description_es, description_en, period_es, period_en, technologies, sort_order)
VALUES (
    'Caritas',
    'Desarrollador Web',
    'Web Developer',
    'Desarrollé e implementé soluciones web escalables utilizando tecnologías modernas. Participé en el desarrollo del frontend y backend, optimizando el rendimiento y la experiencia del usuario. Trabajé en equipo siguiendo metodologías ágiles para entregar proyectos de alta calidad.',
    'I developed and implemented scalable web solutions using modern technologies. I participated in frontend and backend development, optimizing performance and user experience. I worked in teams following agile methodologies to deliver high-quality projects.',
    '07/2025 - 01/2026',
    '07/2025 - 01/2026',
    'React, Spring Boot, PostgreSQL, Docker',
    1
);
