import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class RolGuardService implements CanActivate {
  constructor(private auth: AuthenticationService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let currentUser: any;
    this.auth.currentUser.subscribe((u) => (currentUser = u));
    const expectedRole = route.data.expectedRole;

    if (!currentUser || currentUser.user.rol_id !== expectedRole) {
      this.router.navigate(['/user/login'], {
        queryParams: { auth: 'true' },
      });
      return false;
    }
    return true;
  }
}
