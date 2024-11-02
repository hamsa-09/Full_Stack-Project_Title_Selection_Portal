import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {

  private apiUrl = 'http://localhost:9000/project/internal/guide'; // Change URL if different

  constructor(private http: HttpClient) { }

  // Function to fetch submissions based on guideEmail
  getSubmissionsByGuide(guideEmail: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${guideEmail}`);
  }
}
