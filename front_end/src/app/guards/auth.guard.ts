import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = !!localStorage.getItem('authToken'); // Adjust based on your app's authentication logic
    if (!isLoggedIn) {
      this.router.navigate(['/landpage']); 
      return false;
    }
    return true;
  }
}
