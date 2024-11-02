import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landpage.component.html',
  styleUrls: ['./landpage.component.css']
})
export class LandpageComponent {

  constructor(private router: Router) { }

  navigateToLogin(option: string) {
    switch (option) {
      case 'student':
        this.router.navigate(['/login'], { queryParams: { type: 'student' } });
        break;
      case 'staff':
        this.router.navigate(['/login1'], { queryParams: { type: 'guide' } });
        break;
      case 'admin':
        this.router.navigate(['/login2'], { queryParams: { type: 'admin' } });
        break;
      default:
     
        break;
    }
  }
}
