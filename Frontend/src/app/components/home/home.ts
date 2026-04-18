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
import { EducationService } from '../../services/education.service';
import { Education } from '../../models/education.model';
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
        { name: 'Python', icon: 'fab fa-python', level: 81, color: '#3776AB' },
        { name: 'REST API', icon: 'fas fa-code', level: 90, color: '#FF6C37' },
        { name: 'MongoDB', icon: 'fas fa-leaf', level: 78, color: '#47A248' },
      ],
    },
    {
      key: 'tools',
      items: [
        { name: 'Git', icon: 'fab fa-git-alt', level: 88, color: '#F1502F' },
        { name: 'Vite', icon: 'fas fa-zap', level: 74, color: '#646CFF' },
        { name: 'Power BI', icon: 'fas fa-chart-bar', level: 70, color: '#F2C811' },
        { name: 'Postman', icon: 'fas fa-envelope', level: 79, color: '#FF6C37' },
      ],
    }
  ];

  educationItems: Education[] = [];

  workExperience: WorkExperience[] = [];

  constructor(
    private proyectoService: ProyectoService,
    private perfilService: PerfilService,
    private languageService: LanguageService,
    private workExperienceService: WorkExperienceService,
    private educationService: EducationService,
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
    this.cargarEducacion();
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

  cargarEducacion() {
    this.educationService.getAllEducation().subscribe({
      next: (data) => {
        this.educationItems = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar educacion:', err);
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
            'Some of my personal projects that I have dedicated time and effort to, which have helped shape me as a professional.',
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
            'This section showcases the technologies and tools I use in my work and projects.',
          educationTitle: 'Education',
          educationText:
            'Theoretical foundations and professional training. In this section, I share the educational path that allows me to approach complex projects with a technical, results-oriented perspective.',
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
          projectsTitle: 'Mis proyectos',
          projectsText:
            'Algunos de mis proyectos personales en los que he dedicado tiempo y esfuerzo que me han formado como profesional.',
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
            'En esta seccion se muestran las tecnologias y herramientas que utilizo en mi trabajo y proyectos.',
          educationTitle: 'Educacion',
          educationText:
            'Bases teóricas y formación profesional. En este apartado comparto el recorrido educativo que me permite abordar proyectos complejos con una visión técnica y orientada a resultados.',
          frontend: 'Frontend',
          backend: 'Backend',
          tools: 'Herramientas',
          skillLevel: 'Nivel',
        };
  }

  categoryLabel(key: string): string {
    return this.t[key as 'frontend' | 'backend' | 'tools'] ?? key;
  }

  educationTitle(item: Education): string {
    return this.currentLanguage === 'en' ? (item.titleEn ?? item.titleEs) : item.titleEs;
  }

  educationSchool(item: Education): string {
    return this.currentLanguage === 'en' ? (item.schoolEn ?? item.schoolEs) : item.schoolEs;
  }

  educationText(item: Education): string {
    return this.currentLanguage === 'en' ? (item.textEn ?? item.textEs) : item.textEs;
  }

  toggleSidebarPanel(panel: 'stack' | 'contact') {
    if (panel === 'stack') {
      this.stackExpanded = !this.stackExpanded;
      return;
    }

    this.contactExpanded = !this.contactExpanded;
  }
}
