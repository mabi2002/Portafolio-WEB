import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('frontend');

  constructor(private themeService: ThemeService) {
    // Inicializa el tema automáticamente
  }

  ngOnInit(): void {
    // Asegura que el tema está inicializado cuando la app carga
    // El servicio ya se encarga de esto, pero podemos hacer algo más si es necesario
  }
}
