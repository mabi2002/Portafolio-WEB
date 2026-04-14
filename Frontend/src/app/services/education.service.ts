import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Education } from '../models/education.model';

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  private apiUrl = 'http://localhost:8081/api/education';

  constructor(private http: HttpClient) { }

  getAllEducation(): Observable<Education[]> {
    return this.http.get<Education[]>(this.apiUrl);
  }

  getEducationById(id: number): Observable<Education> {
    return this.http.get<Education>(`${this.apiUrl}/${id}`);
  }

  createEducation(education: Education): Observable<Education> {
    return this.http.post<Education>(this.apiUrl, education);
  }

  updateEducation(id: number, education: Education): Observable<Education> {
    return this.http.put<Education>(`${this.apiUrl}/${id}`, education);
  }

  deleteEducation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
