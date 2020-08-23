import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService } from 'src/app/share/notificacion.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-cartelera-index',
  templateUrl: './cartelera-index.component.html',
  styleUrls: ['./cartelera-index.component.css'],
})
export class CarteleraIndexComponent implements OnInit {
  datos: any;
  error: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private gService: GenericService,
    private notificacion: NotificacionService
  ) {}

  ngOnInit(): void {
    this.listarUbicaciones();
  }

  gnOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  listarUbicaciones() {
    this.gService
      .list('carteleras/ubicacion')
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
}
