import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { LanguageService } from '../../services/language.service';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit {
  darkMode$: Observable<boolean>;
  currentLanguage$: Observable<string>;
  availableLanguages: string[] = [];
  mobileMenuOpen = false;

  constructor(
    private themeService: ThemeService,
    private languageService: LanguageService
  ) {
    this.darkMode$ = this.themeService.darkMode$;
    this.currentLanguage$ = this.languageService.language$;
  }

  ngOnInit() {
    this.availableLanguages = this.languageService.getAvailableLanguages();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  setLanguage(language: string): void {
    this.languageService.setLanguage(language);
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }
}
