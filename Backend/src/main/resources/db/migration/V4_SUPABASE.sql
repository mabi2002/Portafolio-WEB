-- V4: Insert sample data (Supabase safe version)

-- Insert Profile
INSERT INTO perfil (nombre, titulo, bio, email, telefono, cv_url, linkedin_url, github_url, foto_url, experiencia, educacion)
VALUES (
    'Miguel Ángel Barraza',
    'Desarrollador Full Stack | Java | Spring Boot | React',
    'Desarrollador apasionado por crear soluciones web innovadoras. Especializado en tecnologías backend con Java y Spring Boot, combinado con experiencia frontend con JavaScript moderno.',
    'miguel.barraza@ejemplo.com',
    '+34 612 345 678',
    '/files/cv-miguel-barraza.pdf',
    'https://linkedin.com/in/miguelbarraza',
    'https://github.com/miguelbarraza',
    '/images/perfil.jpg',
    'Experiencia laboral aquí',
    'Educación aquí'
) ON CONFLICT DO NOTHING;

-- Insert Sample Projects
INSERT INTO proyectos (titulo, descripcion, tecnologias, imagen_url, url_github, url_demo, fecha_creacion)
VALUES
(
    'Sistema de Gestión de Inventario',
    'Aplicación completa para gestión de inventario con control de stock, reportes en tiempo real y análisis de ventas. Implementado con arquitectura MVC y base de datos relacional optimizada.',
    'Java, Spring Boot, PostgreSQL, Thymeleaf, JavaScript, Bootstrap',
    'https://images.unsplash.com/photo-1460925895917-aae19e938282?w=500&h=300&fit=crop',
    'https://github.com/usuario/sistema-inventario',
    'https://sistema-inventario.ejemplo.com',
    CURRENT_TIMESTAMP - INTERVAL '180 days'
),
(
    'Red Social Profesional',
    'Plataforma de red social diseñada para profesionales. Incluye autenticación OAuth, mensajería en tiempo real con WebSockets, notificaciones y un sistema de recomendaciones basado en IA.',
    'Java, Spring Security, PostgreSQL, Spring WebSocket, ReactJS, Material-UI',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop',
    'https://github.com/usuario/red-social-profesional',
    'https://redsocial.ejemplo.com',
    CURRENT_TIMESTAMP - INTERVAL '150 days'
),
(
    'API REST de E-Commerce',
    'Backend escalable para plataforma de comercio electrónico con autenticación JWT, carrito de compras, procesamiento de pagos integrado con Stripe y sistema de notificaciones por email.',
    'Java, Spring Boot, Spring Security, PostgreSQL, Stripe API, Docker',
    'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=500&h=300&fit=crop',
    'https://github.com/usuario/ecommerce-api',
    'https://api-ecommerce.ejemplo.com',
    CURRENT_TIMESTAMP - INTERVAL '120 days'
),
(
    'Dashboard Analítico',
    'Dashboard interactivo para análisis de datos en tiempo real. Visualización de métricas, gráficos dinámicos y reportes exportables. Integración con múltiples fuentes de datos.',
    'Java, Spring Boot, Angular, Chart.js, PostgreSQL, Apache POI',
    'https://images.unsplash.com/photo-1543269865-cbdf26efb092?w=500&h=300&fit=crop',
    'https://github.com/usuario/dashboard-analitico',
    'https://dashboard.ejemplo.com',
    CURRENT_TIMESTAMP - INTERVAL '90 days'
),
(
    'Gestor de Tareas con Colaboración',
    'Aplicación de productividad para gestión de proyectos y tareas. Soporte para equipos, asignación de tareas, seguimiento de progreso y comentarios en tiempo real.',
    'Java, Spring Boot, PostgreSQL, Vue.js, WebSocket, Redis',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=300&fit=crop',
    'https://github.com/usuario/task-manager',
    'https://tareas.ejemplo.com',
    CURRENT_TIMESTAMP - INTERVAL '60 days'
),
(
    'Sistema de Autenticación Seguro',
    'Microservicio de autenticación y autorización con soporte para 2FA, OAuth2, SAML y Single Sign-On. Incluye auditoría completa de accesos y gestión de roles granular.',
    'Java, Spring Security, PostgreSQL, JWT, Docker, Kubernetes',
    'https://images.unsplash.com/photo-1516321783104-6b6c1f16b68c?w=500&h=300&fit=crop',
    'https://github.com/usuario/auth-microservice',
    'https://auth-demo.ejemplo.com',
    CURRENT_TIMESTAMP - INTERVAL '30 days'
) ON CONFLICT DO NOTHING;
