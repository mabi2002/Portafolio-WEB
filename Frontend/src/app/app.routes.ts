import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { About } from './components/about/about';
import { ProyectoDetalle } from './components/proyecto-detalle/proyecto-detalle';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'proyecto/:id', component: ProyectoDetalle },
  { path: '**', redirectTo: '' }
];
