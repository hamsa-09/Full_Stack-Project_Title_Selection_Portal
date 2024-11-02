import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  studentData: any = {};
  email: string | null = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Get the email from local storage
    this.email = localStorage.getItem('studentEmail');

    // Fetch the student's registration data based on the email
    if (this.email) {
      this.http.get(`http://localhost:9000/project/internal/${this.email}`).subscribe(
        (data: any) => {
          this.studentData = data;
        },
        (error) => {
          console.error('Error fetching student data:', error);
        }
      );
    }
  }
}
