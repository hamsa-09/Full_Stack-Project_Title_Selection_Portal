import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http'; // Import HttpErrorResponse

@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.css']
})
export class GuideComponent implements OnInit {
  guideData: any[] = []; // Changed to an array to hold multiple submissions
  email: string | null = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Get the email from local storage
    this.email = localStorage.getItem('guideEmail');
    
    // Log the email to verify it's retrieved correctly
    console.log('Guide Email:', this.email);
  
    // Fetch the submissions based on the email
    if (this.email) {
      this.http.get<any[]>(`http://localhost:9000/project/internal/guide/${this.email}`).subscribe(
        (data) => {
          console.log('Fetched data:', data); // Log the fetched data for debugging
          if (data && data.length > 0) {
            this.guideData = data.map(item => ({
              ...item,
              isDisabled: false // Initialize isDisabled to false for each guide
            }));
          } else {
            console.error('No data found for this guide email.');
          }
        },
        (error: HttpErrorResponse) => {
          console.error('Error fetching submissions:', error);
        }
      );
    }
  }
  
  updateStatus(guide: any, status: string): void {
    this.http.patch(`http://localhost:9000/project/update-status`, {
      submissionId: guide._id,  // Pass unique submission ID
      status: status
    }).subscribe(
      response => {
        console.log('Update response:', response); // Log the response for debugging
        guide.status = status;
        guide.isDisabled = true; // Disable buttons after selection for this form
      },
      (error: HttpErrorResponse) => {
        console.error('Error updating status:', error);
      }
    );
  }
}  