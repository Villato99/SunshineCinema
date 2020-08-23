import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { NotificacionService } from 'src/app/share/notificacion.service';
import { GenericService } from 'src/app/share/generic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-pelicula-inactivas',
  templateUrl: './pelicula-inactivas.component.html',
  styleUrls: ['./pelicula-inactivas.component.css'],
})
export class PeliculaInactivasComponent implements OnInit {
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
    this.ListaPeliculas();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }

  ListaPeliculas() {
    this.gService
      .list('peliculas/peliculaDeshabilitada')
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

  ActualizarPelicula(id: number) {
    this.router.navigate(['/pelicula/update', id], {
      relativeTo: this.route,
    });
  }

  VerActivas() {
    this.router.navigate(['/pelicula/all'], {
      relativeTo: this.route,
    });
  }
}
