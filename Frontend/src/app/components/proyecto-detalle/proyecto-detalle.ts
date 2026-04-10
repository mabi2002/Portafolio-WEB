import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProyectoService } from '../../services/proyecto.service';
import { Proyecto } from '../../models/proyecto.model';
import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-proyecto-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule, Navbar, Footer],
  templateUrl: './proyecto-detalle.html',
  styleUrl: './proyecto-detalle.scss',
})
export class ProyectoDetalle implements OnInit {
  proyecto: Proyecto | null = null;
  cargando = true;

  constructor(
    private proyectoService: ProyectoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.cargarProyecto();
  }

  cargarProyecto() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.proyectoService.obtenerPorId(Number(id)).subscribe({
        next: (data) => {
          this.proyecto = data;
          this.cargando = false;
        },
        error: (err) => {
          console.error('Error al cargar proyecto:', err);
          this.cargando = false;
        }
      });
    }
  }
}
