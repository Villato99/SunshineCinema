import { Component, OnInit } from '@angular/core';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService } from 'src/app/share/notificacion.service';
import { Subject } from 'rxjs';
import { summaryForJitName } from '@angular/compiler/src/aot/util';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto-index',
  templateUrl: './producto-index.component.html',
  styleUrls: ['./producto-index.component.css'],
})
export class ProductoIndexComponent implements OnInit {
  datos: any;
  error: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private gService: GenericService,
    private notificacion: NotificacionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.listaProductos();
  }

  gnOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  listaProductos() {
    this.gService
      .list('productos/')
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

  sendLike(id: number) {
    console.log(id);
    this.gService.get('productos/like', id).subscribe(
      (respuesta: any) => {
        console.log(respuesta);
        this.router
          .navigateByUrl('/producto/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['/producto/']);
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
    this.gService.get('productos/dislike', id).subscribe(
      (respuesta: any) => {
        console.log(respuesta);
        this.router
          .navigateByUrl('/producto/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['/producto/']);
          });
      },
      (error) => {
        this.error = error;
        this.notificacion.msjValidacion(this.error);
        console.log(error);
      }
    );
  }

  parseValueFloat(value: any) {
    return parseFloat(value);
  }

  parseValueInt(value: any) {
    return parseInt(value);
  }
}
