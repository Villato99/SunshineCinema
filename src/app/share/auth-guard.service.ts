import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Router, CanActivate } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private auth: AuthenticationService, private router: Router) {}

  canActivate(): boolean {
    if (!this.auth.currentUserValue) {
      this.router.navigate(['/user/login/'], { queryParams: { auth: 'true' } });
      return false;
    }
    return true;
  }
}
