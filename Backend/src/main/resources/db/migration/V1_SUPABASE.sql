-- V1: Create projects table (Supabase safe version)

DROP TABLE IF EXISTS proyectos CASCADE;

CREATE TABLE IF NOT EXISTS proyectos (
    id BIGSERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT,
    tecnologias TEXT,
    imagen_url VARCHAR(500),
    url_github VARCHAR(500),
    url_demo VARCHAR(500),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_proyectos_fecha ON proyectos(fecha_creacion DESC);

-- Check constraint para datos válidos
ALTER TABLE proyectos ADD CONSTRAINT check_titulo_not_empty CHECK (titulo IS NOT NULL AND titulo != '');
