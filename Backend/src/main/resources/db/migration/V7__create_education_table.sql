CREATE TABLE education (
    id BIGSERIAL PRIMARY KEY,
    year VARCHAR(255),
    title_es VARCHAR(255) NOT NULL,
    title_en VARCHAR(255),
    school_es VARCHAR(255) NOT NULL,
    school_en VARCHAR(255),
    text_es TEXT,
    text_en TEXT,
    sort_order INTEGER DEFAULT 0
);

CREATE INDEX idx_education_sort_order ON education(sort_order);

-- Insert initial education data
INSERT INTO education (year, title_es, title_en, school_es, school_en, text_es, text_en, sort_order)
VALUES 
(
    '2022 - 2026',
    'Ingenieria en Sistemas',
    'Systems Engineering',
    'Formacion universitaria',
    'University studies',
    'Base solida en desarrollo web, estructura de software, bases de datos y resolucion de problemas.',
    'Strong foundation in web development, software structure, databases, and problem solving.',
    1
),
(
    '2024 - Actualidad',
    'Especializacion Full Stack',
    'Full Stack Specialization',
    'Aprendizaje autonomo y proyectos reales',
    'Self-directed learning and real projects',
    'Profundizacion en Angular, Node.js, APIs REST, interfaces elegantes y despliegue de proyectos.',
    'Deep dive into Angular, Node.js, REST APIs, elegant interfaces, and project deployment.',
    2
);
