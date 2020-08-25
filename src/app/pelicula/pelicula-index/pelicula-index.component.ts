import { Component, OnInit } from '@angular/core';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService } from 'src/app/share/notificacion.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
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

  sendLike(id: number) {
    console.log(id);
    this.gService.get('peliculas/like', id).subscribe(
      (respuesta: any) => {
        console.log(respuesta);
        this.router
          .navigateByUrl('/pelicula/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['/pelicula/']);
          });
      },
      (error) => {
        this.error = error;
        this.notificacion.msjValidacion(this.error);
        console.log(error);
      }
    );
  }

  sendDislike(id: number) {
    console.log(id);
    this.gService.get('peliculas/dislike', id).subscribe(
      (respuesta: any) => {
        console.log(respuesta);
        this.router
          .navigateByUrl('/pelicula/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['/pelicula/']);
          });
      },
      (error) => {
        this.error = error;
        this.notificacion.msjValidacion(this.error);
        console.log(error);
      }
    );
  }

  parseValueInt(count) {
    return parseInt(count);
  }
}
