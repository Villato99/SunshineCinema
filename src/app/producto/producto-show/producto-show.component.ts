import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { ActivatedRoute } from '@angular/router';
import { NotificacionService } from 'src/app/share/notificacion.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-producto-show',
  templateUrl: './producto-show.component.html',
  styleUrls: ['./producto-show.component.css'],
})
export class ProductoShowComponent implements OnInit {
  datos: any;
  error: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private gService: GenericService,
    private notificacion: NotificacionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.obtenerProducto(id);
  }

  gnOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  obtenerProducto(id: any) {
    this.gService
      .get('productos', id)
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
