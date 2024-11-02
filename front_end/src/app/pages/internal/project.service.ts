// src/app/pages/internal/project.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://localhost:9000/project/get_titles'; // Your backend API URL

  constructor(private http: HttpClient) {}

  getProjectTitles(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);  // Fetch the project titles
  }
}
