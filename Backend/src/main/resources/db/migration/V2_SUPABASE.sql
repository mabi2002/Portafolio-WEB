-- V2: Create messages table (Supabase safe version)

DROP TABLE IF EXISTS mensajes CASCADE;

CREATE TABLE IF NOT EXISTS mensajes (
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    asunto VARCHAR(200) NOT NULL,
    mensaje TEXT NOT NULL,
    leido BOOLEAN NOT NULL DEFAULT false,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_mensajes_email ON mensajes(email);
CREATE INDEX IF NOT EXISTS idx_mensajes_fecha ON mensajes(fecha_creacion DESC);
CREATE INDEX IF NOT EXISTS idx_mensajes_leido ON mensajes(leido);
