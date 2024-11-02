import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent {
  constructor(private router: Router) { }

  navigateTo(projectType: string) {
    if (projectType === 'details_add') {
      this.router.navigate(['/details_add']); 
    } else if (projectType === 'download') {
      this.router.navigate(['/download']); 
    }
  }
}
