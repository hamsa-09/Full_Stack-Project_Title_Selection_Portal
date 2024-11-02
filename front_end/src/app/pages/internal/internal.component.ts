import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from './project.service';
import { GuideService } from '../../services/guide.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

interface ProjectTitle {
  _id: string;
  internalTitle: string;
}

interface Guide {
  _id: string;
  guideName: string;
  department: string;
  email: string;
}

@Component({
  selector: 'app-internal',
  templateUrl: './internal.component.html',
  styleUrls: ['./internal.component.css']
})
export class InternalComponent implements OnInit {
  internalForm: FormGroup;  // Declare the form group variable
  projectTitles: ProjectTitle[] = [];
  guides: Guide[] = [];

  constructor(
    private fb: FormBuilder, 
    private http: HttpClient,
    private guideService: GuideService,
    private projectService: ProjectService // Inject ProjectService
  ) {
    this.internalForm = this.fb.group({
      teamSize: ['', Validators.required],
      cluster: ['', Validators.required],
      projectTitle: ['', [Validators.required, Validators.maxLength(100)]],
      teamName: ['', [Validators.required, Validators.maxLength(50)]],
      guide: ['', Validators.required],
      leaderName: ['', Validators.required],
      leaderRoll: ['', [Validators.required, Validators.pattern(/^\d{7}[A-Za-z]{2}\d{3}$/)]],
      email1: ['', [Validators.required, Validators.email]],
      department1: ['', Validators.required],
      member2Name: [''],
      member2Roll: ['', Validators.pattern(/^\d{7}[A-Za-z]{2}\d{3}$/)],
      email2: ['', Validators.email],
      department2: [''],
      member3Name: [''],
      member3Roll: ['', Validators.pattern(/^\d{7}[A-Za-z]{2}\d{3}$/)],
      email3: ['', Validators.email],
      department3: [''],
      type: ['Internal'],  // Default value
      status: ['Pending']  // Default value
    });
  }

  ngOnInit() {
    this.loadProjectTitles();
    this.loadGuides();
    
    // Listen for changes in the team size
    this.internalForm.get('teamSize')?.valueChanges.subscribe((teamSize) => {
      this.updateMemberFieldsBasedOnTeamSize(teamSize);
    });
  }
  
  updateMemberFieldsBasedOnTeamSize(teamSize: number) {
    // Reset all member fields and disable them by default
    this.internalForm.get('leaderName')?.enable(); // Always enabled for Team Leader
    this.internalForm.get('leaderRoll')?.enable();
    this.internalForm.get('email1')?.enable();
    this.internalForm.get('department1')?.enable();
  
    // Disable Member 2 and Member 3 fields
    this.internalForm.get('member2Name')?.disable();
    this.internalForm.get('member2Roll')?.disable();
    this.internalForm.get('email2')?.disable();
    this.internalForm.get('department2')?.disable();
    this.internalForm.get('member3Name')?.disable();
    this.internalForm.get('member3Roll')?.disable();
    this.internalForm.get('email3')?.disable();
    this.internalForm.get('department3')?.disable();
  
    // Enable fields based on the team size
    if (teamSize >= 2) {
      this.internalForm.get('member2Name')?.enable();
      this.internalForm.get('member2Roll')?.enable();
      this.internalForm.get('email2')?.enable();
      this.internalForm.get('department2')?.enable();
    }
  
    if (teamSize == 3) {
      this.internalForm.get('member3Name')?.enable();
      this.internalForm.get('member3Roll')?.enable();
      this.internalForm.get('email3')?.enable();
      this.internalForm.get('department3')?.enable();
    }
  }
  

  loadProjectTitles() {
    this.projectService.getProjectTitles().subscribe(
      (data: ProjectTitle[]) => {
        this.projectTitles = data;
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching project titles', error);
      }
    );
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

  onSubmit() {
    if (this.internalForm.valid) {
      // Find the selected project and guide based on the ID
      const selectedProject = this.projectTitles.find(
        project => project._id === this.internalForm.get('projectTitle')?.value
      );
      const selectedGuide = this.guides.find(
        guide => guide._id === this.internalForm.get('guide')?.value
    );
    
    // Prepare the form data with separate guide fields
    const formData = {
        ...this.internalForm.value,
        projectTitle: selectedProject ? selectedProject.internalTitle : '',
        guideName: selectedGuide ? selectedGuide.guideName : '',
        guideDepartment: selectedGuide ? selectedGuide.department : '',
        guideEmail: selectedGuide ? selectedGuide.email : ''
    };
    
    // Now send `formData` in the submission request
    
      console.log('Form Data:', formData);  // Log the final form data for debugging
      this.http.post('http://localhost:9000/project/internal', formData)
        .subscribe(
          response => {
            console.log('Form submitted successfully', response);
            alert('Form submitted successfully!');
          },
          error => {
            console.error('Error submitting form', error);
            alert('Error submitting the form. Please try again.');
          }
        );
    } else {
      console.log('Form is invalid:', this.internalForm.errors);  // Log validation errors
      alert('Please fill all required fields correctly.');
    }
  }
}  