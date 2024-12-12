import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GuideService } from '../../services/guide.service';
import { HttpErrorResponse } from '@angular/common/http';

interface Guide {
  _id: string;
  guideName: string;
  department: string;
  email: string;
}

@Component({
  selector: 'app-external',
  templateUrl: './external.component.html',
  styleUrls: ['./external.component.css']
})
export class ExternalComponent implements OnInit {
  externalForm: FormGroup;
  guides: Guide[] = [];

  constructor(
    private fb: FormBuilder, 
    private http: HttpClient,
    private guideService: GuideService
  ) {
    this.externalForm = this.fb.group({
      teamSize: ['', Validators.required],
      domain: ['', Validators.required],
      projectTitle: ['', [Validators.required, Validators.maxLength(100)]],
      teamName: ['', [Validators.required, Validators.maxLength(50)]],
      guide: ['', Validators.required],
      leaderName: ['', Validators.required],
      leaderRoll: ['', [Validators.required, Validators.pattern(/^\d{7}[A-Za-z]{2}\d{3}$/)]],
      email1: ['', [Validators.required, Validators.email]],
      department1: ['', Validators.required],
      member2Name: [{ value: '', disabled: true }],
      member2Roll: [{ value: '', disabled: true }, Validators.pattern(/^\d{7}[A-Za-z]{2}\d{3}$/)],
      email2: [{ value: '', disabled: true }, Validators.email],
      department2: [{ value: '', disabled: true }],
      member3Name: [{ value: '', disabled: true }],
      member3Roll: [{ value: '', disabled: true }, Validators.pattern(/^\d{7}[A-Za-z]{2}\d{3}$/)],
      email3: [{ value: '', disabled: true }, Validators.email],
      department3: [{ value: '', disabled: true }],
      type: ['External'],  // Default value
      status: ['Pending']  // Default value
    });

    // Listen for changes in the team size
    this.externalForm.get('teamSize')?.valueChanges.subscribe((teamSize) => {
      this.updateMemberFields(teamSize);
    });
  }

  ngOnInit() {
    this.loadGuides();
  }

  loadGuides() {
    this.guideService.getGuides().subscribe(
      (data: Guide[]) => {
        this.guides = data;
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching guides', error);
      }
    );
  }

  updateMemberFields(teamSize: number) {
    if (teamSize >= 2) {
      this.externalForm.get('member2Name')?.enable();
      this.externalForm.get('member2Roll')?.enable();
      this.externalForm.get('email2')?.enable();
      this.externalForm.get('department2')?.enable();
    } else {
      this.externalForm.get('member2Name')?.disable();
      this.externalForm.get('member2Roll')?.disable();
      this.externalForm.get('email2')?.disable();
      this.externalForm.get('department2')?.disable();
      this.externalForm.get('member2Name')?.reset();
      this.externalForm.get('member2Roll')?.reset();
      this.externalForm.get('email2')?.reset();
      this.externalForm.get('department2')?.reset();
    }

    if (teamSize == 3) {
      this.externalForm.get('member3Name')?.enable();
      this.externalForm.get('member3Roll')?.enable();
      this.externalForm.get('email3')?.enable();
      this.externalForm.get('department3')?.enable();
    } else {
      this.externalForm.get('member3Name')?.disable();
      this.externalForm.get('member3Roll')?.disable();
      this.externalForm.get('email3')?.disable();
      this.externalForm.get('department3')?.disable();
      this.externalForm.get('member3Name')?.reset();
      this.externalForm.get('member3Roll')?.reset();
      this.externalForm.get('email3')?.reset();
      this.externalForm.get('department3')?.reset();
    }
  }

  onSubmit() {
    if (this.externalForm.valid) {
      const emails = [
        this.externalForm.get('email1')?.value,
        this.externalForm.get('email2')?.value,
        this.externalForm.get('email3')?.value,
      ].filter(email => email); // Remove null/undefined values

      this.http.post('http://localhost:9000/project/check-duplicate', { emails })
        .subscribe(
          (response: any) => {
            if (response.duplicate) {
              alert(`Duplicate email(s) found: ${response.existingEmails.join(', ')}`);
            } else {
              this.submitForm();
            }
          },
          (error: HttpErrorResponse) => {
            console.error('Error checking duplicates', error);
            alert('Error checking duplicates. Please try again.');
          }
        );
    } else {
      alert('Please fill all required fields correctly.');
    }
  }

  submitForm() {
    const formData = {
      ...this.externalForm.value,
    };

    this.http.post('http://localhost:9000/project/external', formData)
      .subscribe(
        (response) => {
          console.log('Form submitted successfully', response);
          alert('Form submitted successfully!');
        },
        (error: HttpErrorResponse) => {
          console.error('Error submitting form', error);
          alert('Error submitting the form. Please try again.');
        }
      );
  }
}