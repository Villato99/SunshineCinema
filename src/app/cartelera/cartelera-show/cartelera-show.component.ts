import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService } from 'src/app/share/notificacion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-cartelera-show',
  templateUrl: './cartelera-show.component.html',
  styleUrls: ['./cartelera-show.component.css'],
})
export class CarteleraShowComponent implements OnInit {
  ubicacionesList: any;
  datos: any;
  error: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  formGroup: FormGroup;
  constructor(
    private gService: GenericService,
    private notificacion: NotificacionService,
    private route: ActivatedRoute,
    public formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    let idUbicacion = this.route.snapshot.paramMap.get('id');
    this.ObtenerCartelera(idUbicacion);
  }

  getUbicaciones() {
    return this.gService
      .list('carteleras/ubicacion')
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: any) => {
          this.ubicacionesList = data;
        },
        (error: any) => {
          this.notificacion.mensaje(error.message, error.name, 'error');
        }
      );
  }

  ObtenerCartelera(id: any) {
    this.gService.get('carteleras', id).subscribe(
      (data: any) => {
        this.datos = data;
        //Obtenida la información del producto
        //se construye el formulario
        this.reactiveForm();
      },
      (error: any) => {
        this.notificacion.mensaje(error.message, error.name, 'error');
      }
    );
  }

  reactiveForm() {
    this.getUbicaciones();
    this.formGroup = this.formBuilder.group({
      ubicacion_id: this.route.snapshot.paramMap.get('id'),
    });
  }

  cargarCartelera(idUbicacion: any) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['cartelera/', idUbicacion]);
  }

  ReservarCartelera(id: number) {
    this.router.navigate(['/cartelera/reserva/', id], {
      relativeTo: this.route,
    });
  }
}
