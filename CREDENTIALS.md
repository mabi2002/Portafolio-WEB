# DEPLOYMENT CREDENTIALS - RENDER & VERCEL

## 🐘 SUPABASE DATABASE
Host: db.sfxypsmjlyqqiwobgpdt.supabase.co
Port: 5432
Database: postgres
User: postgres
Password: [Tu contraseña de Supabase]

Connection String:
postgresql://postgres:[PASSWORD]@db.sfxypsmjlyqqiwobgpdt.supabase.co:5432/postgres

---

## 🔧 RENDER - ENVIRONMENT VARIABLES

Copia y pega TODAS estas variables en Render Dashboard → Environment:

```
DB_HOST=db.sfxypsmjlyqqiwobgpdt.supabase.co
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=[Tu contraseña aquí]
DB_NAME=postgres

MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=[Tu email Gmail aquí]
MAIL_PASSWORD=[Tu app password Gmail aquí]
MAIL_FROM=noreply@portafolio.com

OWNER_EMAIL=[Tu email aquí]

CORS_ORIGINS=https://portafolio.vercel.app

PORT=8081
```

---

## 🚀 RENDER - DEPLOYMENT CONFIG

Name: portafolio-backend
Root Directory: Backend
Build Command: mvn clean package -DskipTests
Start Command: java -jar target/Portafolio-0.0.1-SNAPSHOT.jar --spring.profiles.active=prod

---

## 💻 VERCEL - AFTER DEPLOYMENT

Una vez que Render esté deployado, obtendrás una URL como:
https://portafolio-backend.onrender.com

Entonces actualiza:
Frontend/src/environments/environment.prod.ts → apiUrl: 'https://portafolio-backend.onrender.com'

---

## ✅ CHECKLIST

- [ ] Ejecuté el script SQL en Supabase ✓
- [ ] Tengo las credenciales de Supabase ✓
- [ ] Voy a copiar las env vars a Render
- [ ] Voy a desplegar en Render
- [ ] Obtengo la URL de Render
- [ ] Actualizo Frontend environment.prod.ts
- [ ] Despliego en Vercel
