import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Check if the user is logged in (e.g., by checking a token in localStorage)
    const isLoggedIn = !!localStorage.getItem('authToken');

    if (isLoggedIn) {
      return true;
    } else {
      // Redirect to the login page if not logged in
      this.router.navigate(['/landpage']);
      return false;
    }
  }
}
