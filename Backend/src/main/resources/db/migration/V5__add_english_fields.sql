-- Add English fields to proyectos table (if they don't exist)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name='proyectos' AND column_name='titulo_en'
    ) THEN
        ALTER TABLE proyectos ADD COLUMN titulo_en VARCHAR(255);
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name='proyectos' AND column_name='descripcion_en'
    ) THEN
        ALTER TABLE proyectos ADD COLUMN descripcion_en TEXT;
    END IF;
END $$;

-- Add English fields to perfil table (if they don't exist)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name='perfil' AND column_name='titulo_en'
    ) THEN
        ALTER TABLE perfil ADD COLUMN titulo_en VARCHAR(255);
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name='perfil' AND column_name='bio_en'
    ) THEN
        ALTER TABLE perfil ADD COLUMN bio_en TEXT;
    END IF;
END $$;
