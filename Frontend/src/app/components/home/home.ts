import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProyectoService } from '../../services/proyecto.service';
import { Proyecto } from '../../models/proyecto.model';
import { PerfilService } from '../../services/perfil.service';
import { Perfil } from '../../models/perfil.model';
import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';

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

  constructor(
    private proyectoService: ProyectoService,
    private perfilService: PerfilService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.cargarProyectos();
    this.cargarPerfil();
  }

  cargarProyectos(): void {
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

  cargarPerfil(): void {
    this.perfilService.obtenerPerfil().subscribe({
      next: (data) => {
        this.perfil = data;
        this.cargandoPerfil = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.cargandoPerfil = false;
        this.cdr.detectChanges();
      }
    });
  }
}
