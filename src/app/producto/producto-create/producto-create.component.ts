import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { Router } from '@angular/router';
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
  selector: 'app-producto-create',
  templateUrl: './producto-create.component.html',
  styleUrls: ['./producto-create.component.css'],
})
export class ProductoCreateComponent implements OnInit {
  Producto: any;
  clasificacionesList: any;
  tiposProductoList: any;
  error: any;
  formCreate: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    public formBuilder: FormBuilder,
    private gService: GenericService,
    private notificacion: NotificacionService
  ) {
    this.reactiveForm();
  }

  reactiveForm() {
    this.formCreate = this.formBuilder.group({
      name: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      imagen: './assets/img_productos/Chocobanano.jpg',
      tipoproducto_id: ['', [Validators.required]],
      precio: ['', [Validators.required]],
      clasificaciones: this.formBuilder.array([]),
      clasifproducto_id: this.formBuilder.array([]),
      estado: true,
    });
    this.getClasificaciones();
    this.getTiposProducto();
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
      (this.formCreate.controls.clasificaciones as FormArray).push(control);
    });
  }

  get clasificaciones(): FormArray {
    return this.formCreate.get('clasificaciones') as FormArray;
  }
  get clasificacion_id(): FormArray {
    return this.formCreate.get('clasifproducto_id') as FormArray;
  }

  onCheckChange(idCheck, event) {
    /* seleccionado */
    if (event.target.checked) {
      // agregar un nuevo control en el array de controles de los identificadores
      (this.formCreate.controls.clasifproducto_id as FormArray).push(
        new FormControl(event.target.value)
      );
    } else {
      /* Deseleccionar*/
      // Buscar el elemento que se le quito la selección
      let i = 0;

      this.clasificacion_id.controls.forEach((ctrl: FormControl) => {
        if (idCheck == ctrl.value) {
          // Quitar el elemento deseleccionado del array
          (this.formCreate.controls.clasifproducto_id as FormArray).removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  onReset() {
    this.formCreate.reset();
  }

  onBack() {
    this.router.navigate(['/producto/all']);
  }

  public errorHandling = (control: string, error: string) => {
    return this.formCreate.controls[control].hasError(error);
  };

  submitForm() {
    console.log(this.formCreate.value);

    this.gService.create('productos', this.formCreate.value).subscribe(
      (respuesta: any) => {
        this.Producto = respuesta;
        this.router.navigate(['/producto/all'], {
          queryParams: { register: 'true' },
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
