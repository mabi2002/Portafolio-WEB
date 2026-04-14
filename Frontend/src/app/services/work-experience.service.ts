import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WorkExperience } from '../models/work-experience.model';

@Injectable({
  providedIn: 'root',
})
export class WorkExperienceService {
  private apiUrl = '/api/work-experience';

  constructor(private http: HttpClient) {}

  getAllWorkExperience(): Observable<WorkExperience[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(items => items.map(item => this.transformData(item)))
    );
  }

  getWorkExperienceById(id: number): Observable<WorkExperience> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(item => this.transformData(item))
    );
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

  private transformData(item: any): WorkExperience {
    return {
      id: item.id,
      company: item.company,
      roleEs: item.roleEs,
      roleEn: item.roleEn,
      descriptionEs: item.descriptionEs,
      descriptionEn: item.descriptionEn,
      periodEs: item.periodEs,
      periodEn: item.periodEn,
      technologies: typeof item.technologies === 'string' 
        ? item.technologies.split(',').map((t: string) => t.trim())
        : item.technologies,
      sortOrder: item.sortOrder
    };
  }
}
