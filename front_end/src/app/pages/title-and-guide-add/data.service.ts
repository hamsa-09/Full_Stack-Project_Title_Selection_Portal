import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = 'http://localhost:9000';

  constructor(private http: HttpClient) {}

  addTitle(title: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/add_titles`, title);
  }

  getTitles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/get_titles`);
  }

  addGuide(guide: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/add_guides`, guide);
  }

  getGuides(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/get_guides`);
  }
}
