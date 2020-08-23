import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { NotificacionService } from 'src/app/share/notificacion.service';
import { GenericService } from 'src/app/share/generic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-cartelera-inactivas',
  templateUrl: './cartelera-inactivas.component.html',
  styleUrls: ['./cartelera-inactivas.component.css'],
})
export class CarteleraInactivasComponent implements OnInit {
  datos: any;
  error: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService,
    private notificacion: NotificacionService
  ) {}

  ngOnInit(): void {
    this.ListarCarteleras();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }

  ListarCarteleras() {
    this.gService
      .list('carteleras/Deshabilitado')
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: any) => {
          console.log(data);
          this.datos = data;
        },
        (error: any) => {
          this.notificacion.mensaje(error.message, error.name, 'error');
        }
      );
  }

  VerActivas() {
    this.router.navigate(['/cartelera/all'], {
      relativeTo: this.route,
    });
  }
}
