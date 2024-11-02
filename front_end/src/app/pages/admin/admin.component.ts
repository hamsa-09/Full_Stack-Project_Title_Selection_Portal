import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  constructor(private router: Router) { }

  navigateTo(projectType: string) {
    if (projectType === 'insert') {
      this.router.navigate(['/download']); 
    } else if (projectType === 'download') {
      this.router.navigate(['/download']);
    }
  }

}
