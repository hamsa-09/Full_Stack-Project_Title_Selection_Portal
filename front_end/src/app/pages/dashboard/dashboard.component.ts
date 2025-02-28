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

    if (this.email) {
      // Try fetching from 'internal' endpoint
      this.fetchStudentData('internal', () => {
        // If no internal data is found, fallback to 'external' endpoint
        this.fetchStudentData('external');
      });
    } else {
      console.error('No student email found in local storage.');
    }
  }

 fetchStudentData(type: 'internal' | 'external', fallback?: () => void): void {
  const apiUrl = `http://localhost:9000/project/${type}/${this.email}`;

  console.log(`Fetching ${type} data from:`, apiUrl); // Debug log

  this.http.get(apiUrl).subscribe(
    (data: any) => {
      if (Array.isArray(data) && data.length > 0) {
        this.studentData = data[0]; // Take the first object from the array
        console.log(`${type} student data fetched successfully:`, this.studentData);
      } else {
        console.warn(`No valid data found in ${type} response.`);
        this.studentData = null; // Clear data if response is empty
        if (fallback) {
          fallback();
        }
      }
    },
    (error) => {
      console.error(`Error fetching ${type} student data:`, error);
      if (error.status === 404 && fallback) {
        fallback();
      }
    }
  );
}

}
