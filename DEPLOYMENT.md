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

### Keep-alive automático (GitHub Actions, cada 5 min)

En el repo hay un workflow [`.github/workflows/render-keepalive.yml`](../.github/workflows/render-keepalive.yml) que hace `GET` a tu health check **cada 5 minutos** (por debajo del límite de ~15 min de Render).

1. En GitHub: **Settings** → **Secrets and variables** → **Actions** → pestaña **Variables** → **New repository variable**.
2. Nombre: `RENDER_HEALTH_URL`  
   Valor recomendado: `https://TU-SERVICIO.onrender.com/api/health` (con **ruta completa**).  
   Si solo pones `https://TU-SERVICIO.onrender.com`, el workflow **añade** `/api/health` solo; sin eso, `GET /` puede tardar mucho o agotar tiempo de espera con el servicio dormido.
3. Haz **merge** del workflow a la rama **default** (`main`). Los `schedule` solo corren en la rama por defecto del repo.
4. Comprueba en **Actions** que el workflow **Render keep-alive** aparece; puedes lanzarlo manual con **Run workflow** (*workflow_dispatch*).
5. **Actions** debe estar habilitado para el repositorio (Settings → General → Actions).

GitHub puede retrasar unos minutos los `schedule` en horas punta; 5 min de margen suele ser más robusto para evitar el sleep en free. Si un mes GitHub desactiva workflows inactivos en repos sin commits, basta con un push o volver a habilitar Actions.

#### Solo corre al manual y no aparece “scheduled”

1. **¿El repo es un fork?** En forks, GitHub **desactiva por defecto** los workflows con `schedule` hasta que los habilites. Ve a **Actions**: si ves aviso de deshabilitado, pulsa para **activar workflows** (o **Enable workflows**). El manual (`workflow_dispatch`) puede funcionar igual sin eso; el cron no.
2. **Rama por defecto:** **Settings** → **General** → *Default branch* debe ser `main` (o la rama donde está `.github/workflows/render-keepalive.yml`). El `schedule` solo usa la rama por defecto.
3. **Comprobar ejecuciones programadas:** **Actions** → **Render keep-alive** → abre varias ejecuciones: en el encabezado debe decir **scheduled** (no solo *workflow_dispatch*). La primera puede tardar hasta ~1 h en aparecer.
4. **Repo privado gratis:** en algunos casos los `schedule` están muy limitados; si sigue fallando, usa [UptimeRobot](https://uptimerobot.com) con la misma URL cada 5 min como respaldo.

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
- [ ] (Opcional) Variable `RENDER_HEALTH_URL` en GitHub para keep-alive cada 5 min

---

## 🆘 Troubleshooting

### Backend está en sleep (demora 30–60s en responder)
En el **plan gratuito** de Render el servicio se **apaga** tras ~15 minutos sin tráfico. El primer visitante debe esperar a que arranquen el proxy, la JVM y Spring (suele ser medio minuto o más). No es un bug del código.

**Opciones (de más barata a más fiable):**

1. **Mantener el servicio despierto (recomendado en free)**  
   Ping HTTP cada **10–14 minutos** a `https://TU-SERVICIO.onrender.com/api/health`.  
   - **Incluido en este repo:** workflow *Render keep-alive* cada **5 min** (configura la variable `RENDER_HEALTH_URL` en GitHub, ver sección anterior).  
   - Alternativas: [UptimeRobot](https://uptimerobot.com), [cron-job.org](https://cron-job.org).

2. **Reintentos en el frontend**  
   Este repo ya reintenta las peticiones públicas al despertar el backend, para que un timeout puntual no deje la sección vacía.

3. **Pagar plan en Render**  
   Plan de pago con instancia **siempre activa** o menos restricciones de cold start.

4. **Caché HTTP en la API de proyectos**  
   `GET /api/proyectos` declara `Cache-Control` público breve: útil si más adelante pones un CDN o proxy; **no elimina** el cold start del plan gratuito.

### Error CORS
Verifica `cors.allowed-origins` en Render environment variables

### Migraciones no se ejecutaron
En Render agrega `SPRING_FLYWAY_ENABLED=true`, redeploya, y vuelve a ponerlo en `false` al terminar.

---

## 📝 URLs Útiles

- **Render Build Logs**: https://dashboard.render.com (panel derecho)
- **Vercel Build Logs**: https://vercel.com/dashboard
- **Supabase SQL Editor**: https://supabase.com → SQL

