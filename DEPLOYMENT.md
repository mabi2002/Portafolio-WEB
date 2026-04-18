# Guía de Deployment - Portafolio Web

## Status Final
- ✅ Backend: Live en Render 
- ⏳ Frontend: Deploying to Vercel
- ✅ Database: Supabase PostgreSQL

## 📦 Servicios a Desplegar

### 1. Base de Datos (Supabase)
### 2. Backend (Render)
### 3. Frontend (Vercel)

---

## 1️⃣ SUPABASE - Base de Datos

### Crear cuenta y proyecto
1. Ve a https://supabase.com
2. Sign up con GitHub
3. Create new project
4. Espera a que se cree la BD
5. Copia estas credenciales (en Settings → Database):
   - Host: `db.xxxxx.supabase.co`
   - Port: `5432`
   - User: `postgres`
   - Password: (la que elegiste)
   - Database: `postgres`

### Conectar a tu BD local (opcional para probar)
```bash
# Con pgAdmin o psql:
psql -h db.xxxxx.supabase.co -U postgres -d postgres
```

### Ejecutar migraciones en Supabase
1. En Supabase, ve a SQL Editor
2. Copia todo el contenido de cada archivo V1-V7 en orden:
   - V1__create_proyectos_table.sql
   - V2__create_mensajes_table.sql
   - V3__create_perfil_table.sql
   - V4__insert_sample_data.sql
   - V5__add_english_fields.sql
   - V6__create_work_experience_table.sql
   - V7__create_education_table.sql

3. Pega y ejecuta cada uno

---

## 2️⃣ RENDER - Backend Spring Boot

### Crear servicio en Render

1. Ve a https://render.com
2. Sign up/Login con GitHub
3. Click en "New +" → "Web Service"
4. Conecta tu repositorio GitHub (mabi2002/Portafolio-WEB)
5. Configura así:
   - **Name**: portafolio-backend
   - **Root Directory**: Backend
   - **Build Command**: `mvn clean package -DskipTests`
   - **Start Command**: `java -jar target/Portafolio-0.0.1-SNAPSHOT.jar --spring.profiles.active=prod`
   - **Plan**: Free (si aparece)

### Configurar Variables de Entorno en Render

En la página del servicio, va a Environment:

```
DB_HOST=db.xxxxx.supabase.co
DB_PORT=6543
DB_USER=postgres
DB_PASSWORD=tu_password_supabase
DB_NAME=postgres

MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=tu_correo@gmail.com
MAIL_PASSWORD=tu_app_password
MAIL_FROM=noreply@portafolio.com

OWNER_EMAIL=tu_correo@gmail.com

CORS_ORIGINS=https://portafolio.vercel.app

PORT=8081
```

### Obtener URL de tu Backend
Después del deploy, Render te da una URL como:
```
https://portafolio-backend.onrender.com
```

Copia esta URL (la usaremos en Vercel)

---

## 3️⃣ VERCEL - Frontend Angular

### Preparar Frontend

1. Abre [environment.prod.ts](../Frontend/src/environments/environment.prod.ts)
2. Reemplaza la URL:
   ```typescript
   export const environment = {
     production: true,
     apiUrl: 'https://portafolio-backend.onrender.com'  // ← Tu URL de Render
   };
   ```

### Deployar en Vercel

1. Ve a https://vercel.com
2. Sign up/Login con GitHub
3. Click en "Add New..." → "Project"
4. Selecciona tu repo: mabi2002/Portafolio-WEB
5. Configura así:
   - **Framework**: Angular
   - **Root Directory**: Frontend
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/frontend/browser`

6. Click en "Deploy"
7. Vercel auto-desplegará cada vez que hagas push a `main`

---

## ✅ Checklist Final

- [ ] Supabase: BD creada y migraciones ejecutadas
- [ ] Render: Backend deployado y funciona en https://portafolio-backend.onrender.com
- [ ] Vercel: Frontend deployado en https://tu-proyecto.vercel.app
- [ ] Frontend environment.prod.ts apunta a URL de Render
- [ ] Probar endpoints desde navegador: https://portafolio-backend.onrender.com/api/proyectos
- [ ] Probar frontend: https://tu-proyecto.vercel.app

---

## 🆘 Troubleshooting

### Backend está en sleep (demora 30s en responder)
Normal en Render free tier. Después de 15 min inactivo se duerme.

### Error CORS
Verifica `cors.allowed-origins` en Render environment variables

### Migraciones no se ejecutaron
En Render agrega `SPRING_FLYWAY_ENABLED=true`, redeploya, y vuelve a ponerlo en `false` al terminar.

---

## 📝 URLs Útiles

- **Render Build Logs**: https://dashboard.render.com (panel derecho)
- **Vercel Build Logs**: https://vercel.com/dashboard
- **Supabase SQL Editor**: https://supabase.com → SQL

