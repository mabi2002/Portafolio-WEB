import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WorkExperience } from '../models/work-experience.model';

@Injectable({
  providedIn: 'root',
})
export class WorkExperienceService {
  private apiUrl = '/api/work-experience';

  constructor(private http: HttpClient) {}

  getAllWorkExperience(): Observable<WorkExperience[]> {
    return this.http.get<WorkExperience[]>(this.apiUrl);
  }

  getWorkExperienceById(id: number): Observable<WorkExperience> {
    return this.http.get<WorkExperience>(`${this.apiUrl}/${id}`);
  }

  createWorkExperience(experience: WorkExperience): Observable<WorkExperience> {
    return this.http.post<WorkExperience>(this.apiUrl, experience);
  }

  updateWorkExperience(id: number, experience: WorkExperience): Observable<WorkExperience> {
    return this.http.put<WorkExperience>(`${this.apiUrl}/${id}`, experience);
  }

  deleteWorkExperience(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
