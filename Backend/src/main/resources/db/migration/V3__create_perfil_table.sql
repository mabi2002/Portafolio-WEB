CREATE TABLE perfil (
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
    educacion TEXT
);

CREATE INDEX idx_nombre ON perfil(nombre);
