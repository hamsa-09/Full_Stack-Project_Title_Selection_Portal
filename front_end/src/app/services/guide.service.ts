import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuideService {
  private apiUrl = 'http://localhost:9000/project';  // Update with your API URL

  constructor(private http: HttpClient) {}

  getGuides(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/get_guides`);
  }
}
