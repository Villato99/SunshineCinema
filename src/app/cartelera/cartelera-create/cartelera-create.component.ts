import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cartelera-create',
  templateUrl: './cartelera-create.component.html',
  styleUrls: ['./cartelera-create.component.css'],
})
export class CarteleraCreateComponent implements OnInit {
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
