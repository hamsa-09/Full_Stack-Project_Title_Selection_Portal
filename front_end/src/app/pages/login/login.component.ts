import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators'; // Import tap

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {           
  email: string = '';
  password: string = '';
  message: string = '';  
  isSuccess: boolean = false; 

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const loginData = { email: this.email, password: this.password };
    // Using pipe and tap to handle the side effects
    this.http.post('http://localhost:9000/project/login1', loginData, { responseType: 'text' })
      .pipe(
        tap({
          next: (response: string) => {
            this.message = response;
            this.isSuccess = true;
            localStorage.setItem('studentEmail', this.email);
            // Redirect to /layout after success
            this.router.navigate(['/layout']);
          },
          error: (error) => {
            this.message = error.error || 'Login failed';
            this.isSuccess = false;
          }
        })
      )
      .subscribe();  // You still need to call subscribe() to trigger the observable
  }
}
