import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ThemeService } from '../../services/theme.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit, OnDestroy {
  currentLanguage = 'es';
  darkMode = true;
  private readonly destroy$ = new Subject<void>();

  constructor(
    private themeService: ThemeService,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    this.darkMode = this.themeService.getCurrentTheme();
    this.currentLanguage = this.languageService.getCurrentLanguage();

    this.themeService.darkMode$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isDark) => (this.darkMode = isDark));

    this.languageService.language$
      .pipe(takeUntil(this.destroy$))
      .subscribe((language) => (this.currentLanguage = language));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get links() {
    const labels =
      this.currentLanguage === 'en'
        ? {
            home: 'Home',
            projects: 'Projects',
            work: 'Work',
            stack: 'Stack',
            education: 'Education',
          }
        : {
            home: 'Inicio',
            projects: 'Proyectos',
            work: 'Trabajos',
            stack: 'Stack',
            education: 'Educacion',
          };

    return [
      { label: labels.home, fragment: undefined },
      { label: labels.projects, fragment: 'proyectos' },
      { label: labels.work, fragment: 'trabajos' },
      { label: labels.stack, fragment: 'stack' },
      { label: labels.education, fragment: 'educacion' },
    ];
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  toggleLanguage() {
    this.languageService.setLanguage(this.currentLanguage === 'es' ? 'en' : 'es');
  }
}
