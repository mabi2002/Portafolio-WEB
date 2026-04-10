import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private languageSubject = new BehaviorSubject<string>(this.getDefaultLanguage());
  language$ = this.languageSubject.asObservable();

  private availableLanguages = ['es', 'en'];

  constructor(private translateService: TranslateService) {
    this.initializeLanguage();
  }

  private getDefaultLanguage(): string {
    // Verificar si hay idioma guardado
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && this.availableLanguages.includes(savedLanguage)) {
      return savedLanguage;
    }

    // Detectar idioma del navegador
    if (typeof navigator !== 'undefined' && navigator.language) {
      const browserLanguage = navigator.language.split('-')[0];
      if (this.availableLanguages.includes(browserLanguage)) {
        return browserLanguage;
      }
    }

    // Default: español
    return 'es';
  }

  private initializeLanguage(): void {
    const currentLanguage = this.languageSubject.value;
    this.translateService.setDefaultLang('es');
    this.translateService.use(currentLanguage);
  }

  setLanguage(language: string): void {
    if (this.availableLanguages.includes(language)) {
      this.languageSubject.next(language);
      this.translateService.use(language);
      localStorage.setItem('language', language);
    }
  }

  getCurrentLanguage(): string {
    return this.languageSubject.value;
  }

  getAvailableLanguages(): string[] {
    return this.availableLanguages;
  }
}

