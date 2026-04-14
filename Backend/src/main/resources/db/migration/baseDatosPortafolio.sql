--
-- PostgreSQL database dump
--

\restrict fDTPU3Si2a810LuNMM7yINAWqaVjbX1Dx3Mo0x2hCCz1KH862LfHjsxs8FQUr1L

-- Dumped from database version 15.17 (Debian 15.17-1.pgdg13+1)
-- Dumped by pg_dump version 18.3

-- Started on 2026-04-14 02:09:17

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 224 (class 1259 OID 16446)
-- Name: education; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.education (
    id bigint NOT NULL,
    year character varying(255),
    title_es character varying(255) NOT NULL,
    title_en character varying(255),
    school_es character varying(255) NOT NULL,
    school_en character varying(255),
    text_es text,
    text_en text,
    sort_order integer DEFAULT 0
);


ALTER TABLE public.education OWNER TO admin;

--
-- TOC entry 223 (class 1259 OID 16445)
-- Name: education_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.education_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.education_id_seq OWNER TO admin;

--
-- TOC entry 3476 (class 0 OID 0)
-- Dependencies: 223
-- Name: education_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.education_id_seq OWNED BY public.education.id;


--
-- TOC entry 214 (class 1259 OID 16390)
-- Name: flyway_schema_history; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.flyway_schema_history (
    installed_rank integer NOT NULL,
    version character varying(50),
    description character varying(200) NOT NULL,
    type character varying(20) NOT NULL,
    script character varying(1000) NOT NULL,
    checksum integer,
    installed_by character varying(100) NOT NULL,
    installed_on timestamp without time zone DEFAULT now() NOT NULL,
    execution_time integer NOT NULL,
    success boolean NOT NULL
);


ALTER TABLE public.flyway_schema_history OWNER TO admin;

--
-- TOC entry 215 (class 1259 OID 16396)
-- Name: mensajes; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.mensajes (
    id bigint NOT NULL,
    nombre character varying(100) NOT NULL,
    email character varying(255) NOT NULL,
    asunto character varying(200) NOT NULL,
    mensaje text NOT NULL,
    leido boolean DEFAULT false NOT NULL,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.mensajes OWNER TO admin;

--
-- TOC entry 216 (class 1259 OID 16403)
-- Name: mensajes_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.mensajes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.mensajes_id_seq OWNER TO admin;

--
-- TOC entry 3477 (class 0 OID 0)
-- Dependencies: 216
-- Name: mensajes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.mensajes_id_seq OWNED BY public.mensajes.id;


--
-- TOC entry 217 (class 1259 OID 16404)
-- Name: perfil; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.perfil (
    id bigint NOT NULL,
    nombre character varying(255) NOT NULL,
    titulo character varying(255) NOT NULL,
    bio text,
    email character varying(255),
    telefono character varying(20),
    cv_url character varying(500),
    linkedin_url character varying(500),
    github_url character varying(500),
    foto_url character varying(500),
    experiencia text,
    educacion text,
    titulo_en character varying(255),
    bio_en text
);


ALTER TABLE public.perfil OWNER TO admin;

--
-- TOC entry 218 (class 1259 OID 16409)
-- Name: perfil_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.perfil_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.perfil_id_seq OWNER TO admin;

--
-- TOC entry 3478 (class 0 OID 0)
-- Dependencies: 218
-- Name: perfil_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.perfil_id_seq OWNED BY public.perfil.id;


--
-- TOC entry 219 (class 1259 OID 16410)
-- Name: proyectos; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.proyectos (
    id bigint NOT NULL,
    titulo character varying(255) NOT NULL,
    descripcion text,
    tecnologias text,
    imagen_url character varying(500),
    url_github character varying(500),
    url_demo character varying(500),
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    titulo_en character varying(255),
    descripcion_en text
);


ALTER TABLE public.proyectos OWNER TO admin;

--
-- TOC entry 220 (class 1259 OID 16416)
-- Name: proyectos_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.proyectos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.proyectos_id_seq OWNER TO admin;

--
-- TOC entry 3479 (class 0 OID 0)
-- Dependencies: 220
-- Name: proyectos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.proyectos_id_seq OWNED BY public.proyectos.id;


--
-- TOC entry 222 (class 1259 OID 16435)
-- Name: work_experience; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.work_experience (
    id bigint NOT NULL,
    company character varying(255) NOT NULL,
    role_es character varying(255) NOT NULL,
    role_en character varying(255),
    description_es text,
    description_en text,
    period_es character varying(255),
    period_en character varying(255),
    technologies text,
    sort_order integer DEFAULT 0
);


ALTER TABLE public.work_experience OWNER TO admin;

--
-- TOC entry 221 (class 1259 OID 16434)
-- Name: work_experience_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.work_experience_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.work_experience_id_seq OWNER TO admin;

--
-- TOC entry 3480 (class 0 OID 0)
-- Dependencies: 221
-- Name: work_experience_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.work_experience_id_seq OWNED BY public.work_experience.id;


--
-- TOC entry 3296 (class 2604 OID 16449)
-- Name: education id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.education ALTER COLUMN id SET DEFAULT nextval('public.education_id_seq'::regclass);


--
-- TOC entry 3288 (class 2604 OID 16417)
-- Name: mensajes id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.mensajes ALTER COLUMN id SET DEFAULT nextval('public.mensajes_id_seq'::regclass);


--
-- TOC entry 3291 (class 2604 OID 16418)
-- Name: perfil id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.perfil ALTER COLUMN id SET DEFAULT nextval('public.perfil_id_seq'::regclass);


--
-- TOC entry 3292 (class 2604 OID 16419)
-- Name: proyectos id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.proyectos ALTER COLUMN id SET DEFAULT nextval('public.proyectos_id_seq'::regclass);


--
-- TOC entry 3294 (class 2604 OID 16438)
-- Name: work_experience id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.work_experience ALTER COLUMN id SET DEFAULT nextval('public.work_experience_id_seq'::regclass);


--
-- TOC entry 3470 (class 0 OID 16446)
-- Dependencies: 224
-- Data for Name: education; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.education (id, year, title_es, title_en, school_es, school_en, text_es, text_en, sort_order) FROM stdin;
1	2022 - 2026	Ingenieria en Sistemas	Systems Engineering	Formacion universitaria	University studies	Base solida en desarrollo web, estructura de software, bases de datos y resolucion de problemas.	Strong foundation in web development, software structure, databases, and problem solving.	2
2	2024 - Actualidad	Especializacion Full Stack	Full Stack Specialization	Aprendizaje autonomo y proyectos reales	Self-directed learning and real projects	Profundizacion en Angular, Node.js, APIs REST, interfaces elegantes y despliegue de proyectos.	Deep dive into Angular, Node.js, REST APIs, elegant interfaces, and project deployment.	3
3	2017 - 2020	Tecnico en Programacion	Programmer	Cbtis 224	Cbtis 224	Desarrollé habilidades en programación, resolución de problemas y desarrollo de software.	Developed skills in coding, problem-solving, and software development.	1
\.


--
-- TOC entry 3460 (class 0 OID 16390)
-- Dependencies: 214
-- Data for Name: flyway_schema_history; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.flyway_schema_history (installed_rank, version, description, type, script, checksum, installed_by, installed_on, execution_time, success) FROM stdin;
1	1	create proyectos table	SQL	V1__create_proyectos_table.sql	-2033611108	postgres	2026-04-09 18:02:01.598948	24	t
2	2	create mensajes table	SQL	V2__create_mensajes_table.sql	-1878363356	postgres	2026-04-09 18:02:01.653382	17	t
3	3	create perfil table	SQL	V3__create_perfil_table.sql	-840399292	postgres	2026-04-09 18:02:01.685258	12	t
4	4	insert sample data	SQL	V4__insert_sample_data.sql	1406563151	postgres	2026-04-09 18:02:01.709902	10	t
5	5	add english fields	SQL	V5__add_english_fields.sql	-76030528	admin	2026-04-13 21:42:45.895655	39	t
6	6	create work experience table	SQL	V6__create_work_experience_table.sql	-469876681	admin	2026-04-13 21:53:53.432263	88	t
7	7	create education table	SQL	V7__create_education_table.sql	-1718558673	admin	2026-04-13 23:08:15.330685	67	t
\.


--
-- TOC entry 3461 (class 0 OID 16396)
-- Dependencies: 215
-- Data for Name: mensajes; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.mensajes (id, nombre, email, asunto, mensaje, leido, fecha_creacion) FROM stdin;
\.


--
-- TOC entry 3463 (class 0 OID 16404)
-- Dependencies: 217
-- Data for Name: perfil; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.perfil (id, nombre, titulo, bio, email, telefono, cv_url, linkedin_url, github_url, foto_url, experiencia, educacion, titulo_en, bio_en) FROM stdin;
1	Miguel Ángel Barraza	Desarrollador | Analista de Datos | Ingeniero de Automatización 	Soy alguien meticuloso y comprometido con realizar las cosas bien. Cuando me involucro en un proyecto, me gusta entenderlo a fondo, investigar y cuidar cada paso para asegurar resultados que me hagan sentir satisfecho.	miguel_abl@outlook.com	+52 6694368285	/files/cv-miguel-barraza.pdf	https://www.linkedin.com/in/miguel-angel-barraza-99013b2b1/	https://github.com/mabi2002	/images/perfil.jpg	Experiencia laboral aquí	Educación aquí	Developer | Data Analyst | Automation Engineer	I am someone meticulous and committed to doing things well. When I get involved in a project, I like to understand it thoroughly, research it, and take care with every step to ensure results that make me feel satisfied.
\.


--
-- TOC entry 3465 (class 0 OID 16410)
-- Dependencies: 219
-- Data for Name: proyectos; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.proyectos (id, titulo, descripcion, tecnologias, imagen_url, url_github, url_demo, fecha_creacion, titulo_en, descripcion_en) FROM stdin;
5	Gestor de Tareas con Colaboración	Aplicación de productividad para gestión de proyectos y tareas. Soporte para equipos, asignación de tareas.	Java, Spring Boot, PostgreSQL	https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=300&fit=crop	https://github.com/usuario/task-manager	https://tareas.ejemplo.com	2026-02-08 18:02:01.717874	Task Manager with Collaboration	Productivity application for project and task management. Support for teams and task assignment.
6	Sistema de Autenticación Seguro	Microservicio de autenticación y autorización con soporte para 2FA, OAuth2, SAML y Single Sign-On. 	Java, Spring Security, PostgreSQL	/assets/images/Caritas1.jpg	https://github.com/usuario/auth-microservice	https://auth-demo.ejemplo.com	2026-03-10 18:02:01.717874	Secure Authentication System	Authentication and authorization microservice with support for 2FA, OAuth2, SAML, and Single Sign-On.
\.


--
-- TOC entry 3468 (class 0 OID 16435)
-- Dependencies: 222
-- Data for Name: work_experience; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.work_experience (id, company, role_es, role_en, description_es, description_en, period_es, period_en, technologies, sort_order) FROM stdin;
1	Caritas	Desarrollador Web	Web Developer	Desarrollé e implementé soluciones web escalables utilizando tecnologías modernas. Participé en el desarrollo del frontend y backend, optimizando el rendimiento y la experiencia del usuario. Trabajé en equipo siguiendo metodologías ágiles para entregar proyectos de alta calidad.	I developed and implemented scalable web solutions using modern technologies. I participated in frontend and backend development, optimizing performance and user experience. I worked in teams following agile methodologies to deliver high-quality projects.	07/2025 - 01/2026	07/2025 - 01/2026	React, Spring Boot, PostgreSQL, Docker	1
\.


--
-- TOC entry 3481 (class 0 OID 0)
-- Dependencies: 223
-- Name: education_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.education_id_seq', 3, true);


--
-- TOC entry 3482 (class 0 OID 0)
-- Dependencies: 216
-- Name: mensajes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.mensajes_id_seq', 1, false);


--
-- TOC entry 3483 (class 0 OID 0)
-- Dependencies: 218
-- Name: perfil_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.perfil_id_seq', 1, true);


--
-- TOC entry 3484 (class 0 OID 0)
-- Dependencies: 220
-- Name: proyectos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.proyectos_id_seq', 6, true);


--
-- TOC entry 3485 (class 0 OID 0)
-- Dependencies: 221
-- Name: work_experience_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.work_experience_id_seq', 1, true);


--
-- TOC entry 3316 (class 2606 OID 16454)
-- Name: education education_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.education
    ADD CONSTRAINT education_pkey PRIMARY KEY (id);


--
-- TOC entry 3299 (class 2606 OID 16421)
-- Name: flyway_schema_history flyway_schema_history_pk; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.flyway_schema_history
    ADD CONSTRAINT flyway_schema_history_pk PRIMARY KEY (installed_rank);


--
-- TOC entry 3305 (class 2606 OID 16423)
-- Name: mensajes mensajes_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.mensajes
    ADD CONSTRAINT mensajes_pkey PRIMARY KEY (id);


--
-- TOC entry 3308 (class 2606 OID 16425)
-- Name: perfil perfil_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.perfil
    ADD CONSTRAINT perfil_pkey PRIMARY KEY (id);


--
-- TOC entry 3311 (class 2606 OID 16427)
-- Name: proyectos proyectos_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.proyectos
    ADD CONSTRAINT proyectos_pkey PRIMARY KEY (id);


--
-- TOC entry 3314 (class 2606 OID 16443)
-- Name: work_experience work_experience_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.work_experience
    ADD CONSTRAINT work_experience_pkey PRIMARY KEY (id);


--
-- TOC entry 3300 (class 1259 OID 16428)
-- Name: flyway_schema_history_s_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX flyway_schema_history_s_idx ON public.flyway_schema_history USING btree (success);


--
-- TOC entry 3317 (class 1259 OID 16455)
-- Name: idx_education_sort_order; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX idx_education_sort_order ON public.education USING btree (sort_order);


--
-- TOC entry 3301 (class 1259 OID 16429)
-- Name: idx_email; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX idx_email ON public.mensajes USING btree (email);


--
-- TOC entry 3309 (class 1259 OID 16430)
-- Name: idx_fecha_creacion; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX idx_fecha_creacion ON public.proyectos USING btree (fecha_creacion DESC);


--
-- TOC entry 3302 (class 1259 OID 16431)
-- Name: idx_fecha_creacion_mensajes; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX idx_fecha_creacion_mensajes ON public.mensajes USING btree (fecha_creacion DESC);


--
-- TOC entry 3303 (class 1259 OID 16432)
-- Name: idx_leido; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX idx_leido ON public.mensajes USING btree (leido);


--
-- TOC entry 3306 (class 1259 OID 16433)
-- Name: idx_nombre; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX idx_nombre ON public.perfil USING btree (nombre);


--
-- TOC entry 3312 (class 1259 OID 16444)
-- Name: idx_sort_order; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX idx_sort_order ON public.work_experience USING btree (sort_order);


-- Completed on 2026-04-14 02:09:17

--
-- PostgreSQL database dump complete
--

\unrestrict fDTPU3Si2a810LuNMM7yINAWqaVjbX1Dx3Mo0x2hCCz1KH862LfHjsxs8FQUr1L

