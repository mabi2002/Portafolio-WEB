import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProyectoService } from '../../services/proyecto.service';
import { Proyecto } from '../../models/proyecto.model';
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
  cargando = true;

  constructor(private proyectoService: ProyectoService, private cdr: ChangeDetectorRef) {
    console.log('Home component creado');
  }

  ngOnInit() {
    console.log('ngOnInit ejecutado');
    this.cargarProyectos();
  }

  cargarProyectos() {
    console.log('Llamando a obtenerTodos()');
    this.proyectoService.obtenerTodos().subscribe({
      next: (data) => {
        console.log('Proyectos recibidos:', data);
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
}
