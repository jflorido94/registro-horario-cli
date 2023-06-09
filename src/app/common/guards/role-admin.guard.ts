import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleAdmin implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}
  canActivate() {
    if (this.authService.getItemToken('role') == 'Admin') {
      console.log('Admin');
      return true;

    } else {
      this.router.navigate(['/registro']); //? a donde lo redirigimos
      return false;
    }
  }
}
