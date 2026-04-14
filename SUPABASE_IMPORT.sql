-- ========================================
-- PORTAFOLIO DATABASE - SUPABASE VERSION
-- Limpio y listo para ejecutar
-- ========================================

-- Drop existing tables to avoid conflicts
DROP TABLE IF EXISTS flyway_schema_history CASCADE;
DROP TABLE IF EXISTS education CASCADE;
DROP TABLE IF EXISTS work_experience CASCADE;
DROP TABLE IF EXISTS mensajes CASCADE;
DROP TABLE IF EXISTS proyectos CASCADE;
DROP TABLE IF EXISTS perfil CASCADE;

-- ========================================
-- EDUCATION TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS education (
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

CREATE INDEX IF NOT EXISTS idx_education_sort_order ON education(sort_order);

-- ========================================
-- MENSAJES TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS mensajes (
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    asunto VARCHAR(200) NOT NULL,
    mensaje TEXT NOT NULL,
    leido BOOLEAN DEFAULT false NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_email ON mensajes(email);
CREATE INDEX IF NOT EXISTS idx_fecha_creacion_mensajes ON mensajes(fecha_creacion DESC);
CREATE INDEX IF NOT EXISTS idx_leido ON mensajes(leido);

-- ========================================
-- PERFIL TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS perfil (
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    bio TEXT,
    email VARCHAR(255),
    telefono VARCHAR(20),
    cv_url VARCHAR(500),
    linkedin_url VARCHAR(500),
    github_url VARCHAR(500),
    foto_url VARCHAR(500),
    experiencia TEXT,
    educacion TEXT,
    titulo_en VARCHAR(255),
    bio_en TEXT
);

CREATE INDEX IF NOT EXISTS idx_nombre ON perfil(nombre);

-- ========================================
-- PROYECTOS TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS proyectos (
    id BIGSERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT,
    tecnologias TEXT,
    imagen_url VARCHAR(500),
    url_github VARCHAR(500),
    url_demo VARCHAR(500),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    titulo_en VARCHAR(255),
    descripcion_en TEXT
);

CREATE INDEX IF NOT EXISTS idx_fecha_creacion ON proyectos(fecha_creacion DESC);

-- ========================================
-- WORK_EXPERIENCE TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS work_experience (
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

CREATE INDEX IF NOT EXISTS idx_sort_order ON work_experience(sort_order);

-- ========================================
-- DATA INSERTION
-- ========================================

-- Insert Profile
INSERT INTO perfil (nombre, titulo, bio, email, telefono, cv_url, linkedin_url, github_url, foto_url, experiencia, educacion, titulo_en, bio_en)
VALUES (
    'Miguel Ángel Barraza',
    'Desarrollador | Analista de Datos | Ingeniero de Automatización',
    'Soy alguien meticuloso y comprometido con realizar las cosas bien. Cuando me involucro en un proyecto, me gusta entenderlo a fondo, investigar y cuidar cada paso para asegurar resultados que me hagan sentir satisfecho.',
    'miguel_abl@outlook.com',
    '+52 6694368285',
    '/files/cv-miguel-barraza.pdf',
    'https://www.linkedin.com/in/miguel-angel-barraza-99013b2b1/',
    'https://github.com/mabi2002',
    '/images/perfil.jpg',
    'Experiencia laboral aquí',
    'Educación aquí',
    'Developer | Data Analyst | Automation Engineer',
    'I am someone meticulous and committed to doing things well. When I get involved in a project, I like to understand it thoroughly, research it, and take care with every step to ensure results that make me feel satisfied.'
) ON CONFLICT DO NOTHING;

-- Insert Projects
INSERT INTO proyectos (titulo, descripcion, tecnologias, imagen_url, url_github, url_demo, fecha_creacion, titulo_en, descripcion_en)
VALUES
(
    'Gestor de Tareas con Colaboración',
    'Aplicación de productividad para gestión de proyectos y tareas. Soporte para equipos, asignación de tareas.',
    'Java, Spring Boot, PostgreSQL',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=300&fit=crop',
    'https://github.com/usuario/task-manager',
    'https://tareas.ejemplo.com',
    CURRENT_TIMESTAMP - INTERVAL '60 days',
    'Task Manager with Collaboration',
    'Productivity application for project and task management. Support for teams and task assignment.'
),
(
    'Sistema de Autenticación Seguro',
    'Microservicio de autenticación y autorización con soporte para 2FA, OAuth2, SAML y Single Sign-On.',
    'Java, Spring Security, PostgreSQL',
    '/assets/images/Caritas1.jpg',
    'https://github.com/usuario/auth-microservice',
    'https://auth-demo.ejemplo.com',
    CURRENT_TIMESTAMP - INTERVAL '30 days',
    'Secure Authentication System',
    'Authentication and authorization microservice with support for 2FA, OAuth2, SAML, and Single Sign-On.'
) ON CONFLICT DO NOTHING;

-- Insert Work Experience
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
) ON CONFLICT DO NOTHING;

-- Insert Education
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
    2
),
(
    '2024 - Actualidad',
    'Especializacion Full Stack',
    'Full Stack Specialization',
    'Aprendizaje autonomo y proyectos reales',
    'Self-directed learning and real projects',
    'Profundizacion en Angular, Node.js, APIs REST, interfaces elegantes y despliegue de proyectos.',
    'Deep dive into Angular, Node.js, REST APIs, elegant interfaces, and project deployment.',
    3
),
(
    '2017 - 2020',
    'Tecnico en Programacion',
    'Programmer',
    'Cbtis 224',
    'Cbtis 224',
    'Desarrollé habilidades en programación, resolución de problemas y desarrollo de software.',
    'Developed skills in coding, problem-solving, and software development.',
    1
) ON CONFLICT DO NOTHING;

-- ========================================
-- DONE!
-- ========================================
