CREATE TABLE proyectos (
    id BIGSERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT,
    tecnologias TEXT,
    imagen_url VARCHAR(500),
    url_github VARCHAR(500),
    url_demo VARCHAR(500),
    fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_fecha_creacion ON proyectos(fecha_creacion DESC);
