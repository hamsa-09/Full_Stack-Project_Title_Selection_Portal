import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InternalFormService {
  private baseUrl = 'http://localhost:9000/internal';  // Node.js backend URL

  constructor(private http: HttpClient) {}

  submitForm(formData: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${this.baseUrl}`, formData, { headers });
  }
}
