import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.css'],
})
export class GuideComponent implements OnInit {
  guideData: any[] = []; // Holds both Internal & External submissions
  email: string | null = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.email = localStorage.getItem('guideEmail');
    console.log('Guide Email:', this.email);

    if (this.email) {
      this.fetchGuideSubmissions(this.email);
    }
  }

  fetchGuideSubmissions(guideEmail: string): void {
    this.http.get<any[]>(`http://localhost:9000/project/guide/${guideEmail}`).subscribe(
      (data) => {
        console.log('Fetched data:', data);
        if (Array.isArray(data) && data.length > 0) {
          this.guideData = data.map((item) => ({
            ...item,
            isDisabled: item.status.toLowerCase() === 'approved', // Disable only approved items
          }));
        } else {
          console.warn('No submissions found for this guide email.');
          this.guideData = [];
        }
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching submissions:', error);
      }
    );
  }

  updateStatus(guide: any, status: string): void {
    this.http
      .patch(`http://localhost:9000/project/update-status`, {
        submissionId: guide._id, // Ensure ID is passed correctly
        status: status,
      })
      .subscribe(
        (response) => {
          console.log('Status updated successfully:', response);
          guide.status = status;
          guide.isDisabled = true; // Disable button after approving
        },
        (error: HttpErrorResponse) => {
          console.error('Error updating status:', error);
        }
      );
  }
}
