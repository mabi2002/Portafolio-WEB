import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilService } from '../../services/perfil.service';
import { Perfil } from '../../models/perfil.model';
import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, Navbar, Footer],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About implements OnInit {
  perfil: Perfil | null = null;
  cargando = true;

  constructor(private perfilService: PerfilService) {}

  ngOnInit() {
    this.cargarPerfil();
  }

  cargarPerfil() {
    this.perfilService.obtenerPerfil().subscribe({
      next: (data) => {
        this.perfil = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar perfil:', err);
        this.cargando = false;
      }
    });
  }
}
