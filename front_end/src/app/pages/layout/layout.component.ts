import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
  
})
export class LayoutComponent {
  constructor(private router: Router) { }

  navigateTo(projectType: string) {
    if (projectType === 'internal') {
      this.router.navigate(['/internal']); 
    } else if (projectType === 'external') {
      this.router.navigate(['/external']); 
    }
  }
}