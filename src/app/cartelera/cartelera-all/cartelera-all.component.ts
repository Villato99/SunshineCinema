import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService } from 'src/app/share/notificacion.service';

@Component({
  selector: 'app-cartelera-all',
  templateUrl: './cartelera-all.component.html',
  styleUrls: ['./cartelera-all.component.css'],
})
export class CarteleraAllComponent implements OnInit {
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
      .list('carteleras/')
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

  ActualizarCartelera(id: number) {
    this.router.navigate(['/cartelera/update', id], {
      relativeTo: this.route,
    });
  }

  CrearCartelera() {
    this.router.navigate(['/cartelera/create'], {
      relativeTo: this.route,
    });
  }

  VerInactivas() {
    this.router.navigate(['/cartelera/inactivas'], {
      relativeTo: this.route,
    });
  }
}
