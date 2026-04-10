CREATE TABLE mensajes (
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    asunto VARCHAR(200) NOT NULL,
    mensaje TEXT NOT NULL,
    leido BOOLEAN NOT NULL DEFAULT false,
    fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_email ON mensajes(email);
CREATE INDEX idx_fecha_creacion_mensajes ON mensajes(fecha_creacion DESC);
CREATE INDEX idx_leido ON mensajes(leido);
