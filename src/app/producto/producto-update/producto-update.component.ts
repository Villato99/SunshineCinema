import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  FormArray,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService } from 'src/app/share/notificacion.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-producto-update',
  templateUrl: './producto-update.component.html',
  styleUrls: ['./producto-update.component.css'],
})
export class ProductoUpdateComponent implements OnInit {
  Producto: any;
  clasificacionesList: any;
  tiposProductoList: any;
  error: any;
  formUpdate: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    public formBuilder: FormBuilder,
    private gService: GenericService,
    private notificacion: NotificacionService
  ) {
    if (authService.currentUserValue == null) {
      this.router.navigate(['/']);
    } else if (authService.currentUserValue.user.rol_id == 2) {
      this.router.navigate(['/']);
    } else {
      const idPelicula = +this.route.snapshot.paramMap.get('id');
      this.getPelicula(idPelicula);
    }
  }

  getPelicula(id: number) {
    this.gService.get('productos', id).subscribe(
      (respuesta: any) => {
        this.Producto = respuesta;
        //Obtenida la información del producto
        //se construye el formulario
        this.reactiveForm();
      },
      (error) => {
        this.error = error;
        this.notificacion.msjValidacion(this.error);
      }
    );
  }

  reactiveForm() {
    this.getTiposProducto();
    this.getClasificaciones();

    if (this.Producto) {
      //Cargar la información del videojuego
      //en los controles que conforman el formulario
      this.formUpdate = this.formBuilder.group({
        id: [this.Producto.id, [Validators.required]],
        name: [this.Producto.name, [Validators.required]],
        descripcion: [this.Producto.descripcion, [Validators.required]],
        tipoproducto_id: [this.Producto.tipoproducto, [Validators.required]],
        imagen: ['./assets/img_productos/momia.jpg', [Validators.required]],
        clasificaciones: this.formBuilder.array([]),
        clasifproducto_id: this.formBuilder.array([]),
        estado: [true, [Validators.required]],
        precio: [this.Producto.precio, [Validators.required]],
      });
    }
  }

  getClasificaciones() {
    return this.gService.list('productos/clasifproducto').subscribe(
      (respuesta: any) => {
        (this.clasificacionesList = respuesta), this.cheboxesClasificaciones();
      },
      (error) => {
        this.error = error;
        this.notificacion.msjValidacion(this.error);
      }
    );
  }

  getTiposProducto() {
    return this.gService
      .list('productos/tipoproducto')
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: any) => {
          this.tiposProductoList = data;
        },
        (error: any) => {
          this.notificacion.mensaje(error.message, error.name, 'error');
        }
      );
  }

  private cheboxesClasificaciones() {
    this.clasificacionesList.forEach(() => {
      const control = new FormControl(); // primer parámetro valor a asignar
      (this.formUpdate.controls.clasificaciones as FormArray).push(control);
    });
  }

  get clasificaciones(): FormArray {
    return this.formUpdate.get('clasificaciones') as FormArray;
  }
  get clasificacion_id(): FormArray {
    return this.formUpdate.get('clasifproducto_id') as FormArray;
  }

  onCheckChange(idCheck, event) {
    /* seleccionado */
    if (event.target.checked) {
      // agregar un nuevo control en el array de controles de los identificadores
      (this.formUpdate.controls.clasifproducto_id as FormArray).push(
        new FormControl(event.target.value)
      );
    } else {
      /* Deseleccionar*/
      // Buscar el elemento que se le quito la selección
      let i = 0;

      this.clasificacion_id.controls.forEach((ctrl: FormControl) => {
        if (idCheck == ctrl.value) {
          // Quitar el elemento deseleccionado del array
          (this.formUpdate.controls.clasifproducto_id as FormArray).removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  onReset() {
    this.formUpdate.reset();
  }

  onBack() {
    this.router.navigate(['/producto/all']);
  }

  public errorHandling = (control: string, error: string) => {
    return this.formUpdate.controls[control].hasError(error);
  };

  submitForm() {
    console.log(this.formUpdate.value);
    this.gService.update('productos', this.formUpdate.value).subscribe(
      (respuesta: any) => {
        this.Producto = respuesta;
        this.router.navigate(['/producto/all'], {
          queryParams: { update: 'true' },
        });
      },
      (error) => {
        this.error = error;
        this.notificacion.msjValidacion(this.error);
      }
    );
  }

  ngOnInit(): void {}
}
