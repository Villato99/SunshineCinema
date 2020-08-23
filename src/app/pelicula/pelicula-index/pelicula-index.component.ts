import { Component, OnInit } from '@angular/core';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService } from 'src/app/share/notificacion.service';
import { Subject } from 'rxjs';
import { summaryForJitName } from '@angular/compiler/src/aot/util';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
//import { AuthenticationService } from 'src/app/share/authentication.service'
@Component({
  selector: 'app-pelicula-index',
  templateUrl: './pelicula-index.component.html',
  styleUrls: ['./pelicula-index.component.css'],
})
export class PeliculaIndexComponent implements OnInit {
  datos: any;
  error: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private gService: GenericService,
    private notificacion: NotificacionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.listaPeliculas();
    this.mensajes();
  }
  gnOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  listaPeliculas() {
    this.gService
      .list('peliculas/')
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

  mensajes() {
    let auth = false;
    this.route.queryParams.subscribe((params) => {
      auth = params.auth || false;
    });
    if (auth) {
      this.notificacion.mensaje(
        'Usuario',
        'Su usuario no posee permisos para ingresar a este recurso!',
        'warning'
      );
    }
  }
}
