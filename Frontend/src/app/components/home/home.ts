import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProyectoService } from '../../services/proyecto.service';
import { Proyecto } from '../../models/proyecto.model';
import { Perfil } from '../../models/perfil.model';
import { PerfilService } from '../../services/perfil.service';
import { LanguageService } from '../../services/language.service';
import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';

interface TechItem {
  name: string;
  icon: string;
  level: number;
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
  stackExpanded = false;
  contactExpanded = false;
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
        { name: 'Angular', icon: 'NG', level: 92 },
        { name: 'TypeScript', icon: 'TS', level: 89 },
        { name: 'SCSS', icon: 'SC', level: 84 },
        { name: 'HTML', icon: 'HT', level: 95 },
      ],
    },
    {
      key: 'backend',
      items: [
        { name: 'Node.js', icon: 'ND', level: 86 },
        { name: 'Express', icon: 'EX', level: 81 },
        { name: 'REST API', icon: 'AP', level: 90 },
        { name: 'MongoDB', icon: 'MG', level: 78 },
      ],
    },
    {
      key: 'tools',
      items: [
        { name: 'Git', icon: 'GT', level: 88 },
        { name: 'Vite', icon: 'VT', level: 74 },
        { name: 'Figma', icon: 'FG', level: 67 },
        { name: 'Postman', icon: 'PM', level: 79 },
      ],
    },
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

  constructor(
    private proyectoService: ProyectoService,
    private perfilService: PerfilService,
    private languageService: LanguageService,
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

  get proyectosPrincipales(): Proyecto[] {
    return this.proyectos.slice(0, 4);
  }

  get trabajosAdicionales(): Proyecto[] {
    return this.proyectos.slice(4);
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
          fallbackRole: 'Full Stack Developer',
          fallbackBio:
            'I build clean interfaces, stable backend systems, and modern web experiences with an elegant visual language.',
          viewProfile: 'Profile',
          contact: 'Contact',
          heroEyebrow: 'Selected Work',
          heroTitle: 'Design',
          heroTitleAccent: '& Code',
          heroText:
            'A curated selection of projects focused on clean UI, performance, and a polished dark aesthetic inspired by your reference.',
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
          workTitle: 'My Work',
          workText: 'An additional gallery for collaborations and extra work.',
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
          fallbackRole: 'Desarrollador Full Stack',
          fallbackBio:
            'Construyo interfaces limpias, backend estable y experiencias web modernas con una estetica sobria y profesional.',
          viewProfile: 'Perfil',
          contact: 'Contacto',
          heroEyebrow: 'Selected Work',
          heroTitle: 'Diseno',
          heroTitleAccent: '& Codigo',
          heroText:
            'Una seleccion de proyectos con enfoque en UI limpia, performance y una presencia visual oscura inspirada en la referencia que compartiste.',
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
          workTitle: 'My Work',
          workText: 'Una segunda galeria para proyectos adicionales y colaboraciones.',
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
