import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cartelera-update',
  templateUrl: './cartelera-update.component.html',
  styleUrls: ['./cartelera-update.component.css'],
})
export class CarteleraUpdateComponent implements OnInit {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    if (authService.currentUserValue == null) {
      this.router.navigate(['/']);
    } else if (authService.currentUserValue.user.rol_id == 2) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {}
}
