import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProyectoService } from '../../services/proyecto.service';
import { Proyecto } from '../../models/proyecto.model';
import { Perfil } from '../../models/perfil.model';
import { PerfilService } from '../../services/perfil.service';
import { LanguageService } from '../../services/language.service';
import { WorkExperienceService } from '../../services/work-experience.service';
import { WorkExperience } from '../../models/work-experience.model';
import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';

interface TechItem {
  name: string;
  icon: string;
  level: number;
  color?: string;
}

interface TechCategory {
  key: string;
  items: TechItem[];
}

interface EducationItem {
  year: string;
  titleEs: string;
  titleEn: string;
  schoolEs: string;
  schoolEn: string;
  textEs: string;
  textEn: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, Navbar, Footer],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  proyectos: Proyecto[] = [];
  perfil: Perfil | null = null;
  cargando = true;
  cargandoPerfil = true;
  currentLanguage = 'es';
  stackExpanded = true;
  contactExpanded = true;
  readonly stack = [
    'Angular',
    'TypeScript',
    'SCSS',
    'Node.js',
    'Express',
    'MongoDB',
    'REST APIs',
    'Git',
  ];
  readonly socialLinks = [
    { label: 'GitHub', short: 'GH', key: 'githubUrl' as const },
    { label: 'LinkedIn', short: 'IN', key: 'linkedinUrl' as const },
    { label: 'Email', short: 'EM', key: 'email' as const },
  ];
  readonly techCategories: TechCategory[] = [
    {
      key: 'frontend',
      items: [
        { name: 'Angular', icon: 'fab fa-angular', level: 92, color: '#DD0031' },
        { name: 'TypeScript', icon: 'fab fa-js', level: 89, color: '#3178C6' },
        { name: 'SCSS', icon: 'fab fa-sass', level: 84, color: '#C6538C' },
        { name: 'HTML', icon: 'fab fa-html5', level: 95, color: '#E34C26' },
      ],
    },
    {
      key: 'backend',
      items: [
        { name: 'Node.js', icon: 'fab fa-node-js', level: 86, color: '#339933' },
        { name: 'Express', icon: 'fas fa-cube', level: 81, color: '#000000' },
        { name: 'REST API', icon: 'fas fa-code', level: 90, color: '#FF6C37' },
        { name: 'MongoDB', icon: 'fas fa-leaf', level: 78, color: '#47A248' },
      ],
    },
    {
      key: 'tools',
      items: [
        { name: 'Git', icon: 'fab fa-git-alt', level: 88, color: '#F1502F' },
        { name: 'Vite', icon: 'fas fa-zap', level: 74, color: '#646CFF' },
        { name: 'Figma', icon: 'fab fa-figma', level: 67, color: '#F24E1E' },
        { name: 'Postman', icon: 'fas fa-envelope', level: 79, color: '#FF6C37' },
      ],
    }
  ];
  readonly educationItems: EducationItem[] = [
    {
      year: '2022 - 2026',
      titleEs: 'Ingenieria en Sistemas',
      titleEn: 'Systems Engineering',
      schoolEs: 'Formacion universitaria',
      schoolEn: 'University studies',
      textEs: 'Base solida en desarrollo web, estructura de software, bases de datos y resolucion de problemas.',
      textEn: 'Strong foundation in web development, software structure, databases, and problem solving.',
    },
    {
      year: '2024 - Actualidad',
      titleEs: 'Especializacion Full Stack',
      titleEn: 'Full Stack Specialization',
      schoolEs: 'Aprendizaje autonomo y proyectos reales',
      schoolEn: 'Self-directed learning and real projects',
      textEs: 'Profundizacion en Angular, Node.js, APIs REST, interfaces elegantes y despliegue de proyectos.',
      textEn: 'Deep dive into Angular, Node.js, REST APIs, elegant interfaces, and project deployment.',
    },
  ];

  workExperience: WorkExperience[] = [];

  constructor(
    private proyectoService: ProyectoService,
    private perfilService: PerfilService,
    private languageService: LanguageService,
    private workExperienceService: WorkExperienceService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.currentLanguage = this.languageService.getCurrentLanguage();
    this.languageService.language$.subscribe((language) => {
      this.currentLanguage = language;
      this.cdr.detectChanges();
    });
    this.cargarPerfil();
    this.cargarProyectos();
    this.cargarWorkExperience();
  }

  cargarProyectos() {
    this.proyectoService.obtenerTodos().subscribe({
      next: (data) => {
        this.proyectos = data;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar proyectos:', err);
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  cargarPerfil() {
    this.perfilService.obtenerPerfil().subscribe({
      next: (data) => {
        this.perfil = data;
        this.cargandoPerfil = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar perfil:', err);
        this.cargandoPerfil = false;
        this.cdr.detectChanges();
      }
    });
  }

  cargarWorkExperience() {
    this.workExperienceService.getAllWorkExperience().subscribe({
      next: (data) => {
        this.workExperience = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar experiencia laboral:', err);
        this.cdr.detectChanges();
      }
    });
  }

  get proyectosPrincipales(): Proyecto[] {
    return this.proyectos;
  }

  get nombreCorto(): string {
    if (!this.perfil?.nombre) {
      return 'MG';
    }

    return this.perfil.nombre
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((parte) => parte[0]?.toUpperCase())
      .join('');
  }

  socialHref(key: 'githubUrl' | 'linkedinUrl' | 'email'): string | null {
    if (!this.perfil) {
      return null;
    }

    if (key === 'email' && this.perfil.email) {
      return `mailto:${this.perfil.email}`;
    }

    return this.perfil[key] ?? null;
  }

  get t() {
    return this.currentLanguage === 'en'
      ? {
          availability: 'Online',
          profileEyebrow: 'Portfolio',
          fallbackRole: 'Developer | Data Analyst | Automation',
          fallbackBio:
            'I am meticulous and committed to doing things well. When I engage in a project, I like to understand it thoroughly, research, and care for every step to ensure results that make me feel satisfied.',
          viewProfile: 'Profile',
          contact: 'Contact',
          heroEyebrow: '',
          heroTitle: 'Analyst',
          heroTitleAccent: 'and Developer',
          heroText:
            'Explore a selection of my work where systems engineering meets data science. I develop scalable platforms and design data architectures that optimize workflows, automate processes, and visualize critical KPIs in real-time.',
          heroPrimary: 'View projects',
          heroSecondary: 'Explore stack',
          projectsTitle: 'My Projects',
          projectsText:
            'Large cards, clear hierarchy, and subtle accents so the work stays at the center.',
          featuredProject: 'Featured Project',
          loadingProjects: 'Loading projects...',
          emptyProjects: 'No projects available yet.',
          source: 'Source',
          website: 'Website',
          experienceTitle: 'Work Experience',
          experienceText:
            'Professional experience and key achievements in my career.',
          stackTitle: 'Tech Stack',
          stackText:
            'Grouped by category with a square progress outline that wraps the icon according to the skill level.',
          educationTitle: 'Education',
          educationText:
            'A compact, elegant summary of the training path behind the projects.',
          frontend: 'Frontend',
          backend: 'Backend',
          tools: 'Tools',
          skillLevel: 'Skill level',
        }
      : {
          availability: 'Disponible',
          profileEyebrow: 'Portfolio',
          fallbackRole: 'Desarrollador | Analista de Datos | Automatizacion',
          fallbackBio:
            'Soy alguien meticuloso y comprometido con realizar las cosas bien. Cuando me involucro en un proyecto, me gusta entenderlo a fondo, investigar y cuidar cada paso para asegurar resultados que me hagan sentir satisfecho.',
          viewProfile: 'Perfil',
          contact: 'Contacto',
          heroEyebrow: '',
          heroTitle: 'Analista',
          heroTitleAccent: 'y Developer',
          heroText:
            'Explora una selección de mis trabajos donde la ingeniería de sistemas se encuentra con la ciencia de datos. Desarrollo plataformas escalables y diseño arquitecturas de datos que permiten optimizar flujos de trabajo, automatizar procesos y visualizar KPIs críticos en tiempo real.',
          heroPrimary: 'Ver proyectos',
          heroSecondary: 'Ver stack',
          projectsTitle: 'My Projects',
          projectsText:
            'Tarjetas amplias, jerarquia clara y acentos minimos para que el trabajo sea el protagonista.',
          featuredProject: 'Proyecto destacado',
          loadingProjects: 'Cargando proyectos...',
          emptyProjects: 'No hay proyectos disponibles todavia.',
          source: 'Codigo',
          website: 'Sitio',
          experienceTitle: 'Experiencia Laboral',
          experienceText:
            'Mi experiencia profesional y logros clave en mi carrera.',
          stackTitle: 'Stack Tecnologico',
          stackText:
            'Organizado por categorias con un borde progresivo cuadrado que rodea el icono segun el nivel de habilidad.',
          educationTitle: 'Educacion',
          educationText:
            'Un resumen elegante y compacto del camino formativo que respalda los proyectos.',
          frontend: 'Frontend',
          backend: 'Backend',
          tools: 'Herramientas',
          skillLevel: 'Nivel',
        };
  }

  categoryLabel(key: string): string {
    return this.t[key as 'frontend' | 'backend' | 'tools'] ?? key;
  }

  educationTitle(item: EducationItem): string {
    return this.currentLanguage === 'en' ? item.titleEn : item.titleEs;
  }

  educationSchool(item: EducationItem): string {
    if (this.perfil?.educacion && item === this.educationItems[0]) {
      return this.perfil.educacion;
    }

    return this.currentLanguage === 'en' ? item.schoolEn : item.schoolEs;
  }

  educationText(item: EducationItem): string {
    return this.currentLanguage === 'en' ? item.textEn : item.textEs;
  }

  toggleSidebarPanel(panel: 'stack' | 'contact') {
    if (panel === 'stack') {
      this.stackExpanded = !this.stackExpanded;
      return;
    }

    this.contactExpanded = !this.contactExpanded;
  }
}
