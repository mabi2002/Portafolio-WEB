import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Perfil } from '../models/perfil.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private apiUrl = `${environment.apiUrl}/api/perfil`;

  constructor(private http: HttpClient) { }

  obtenerPerfil(): Observable<Perfil> {
    return this.http.get<Perfil>(this.apiUrl);
  }
}
