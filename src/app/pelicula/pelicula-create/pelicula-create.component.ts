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
  selector: 'app-pelicula-create',
  templateUrl: './pelicula-create.component.html',
  styleUrls: ['./pelicula-create.component.css'],
})
export class PeliculaCreateComponent implements OnInit {
  Pelicula: any;
  generosList: any;
  clasificaciones: any;
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
      sinopsis: ['', [Validators.required]],
      clasificacion_id: ['', [Validators.required]],
      imagen: ['./assets/img_productos/ironman.jpg', [Validators.required]],
      generos: this.formBuilder.array([]),
      genero_id: this.formBuilder.array([]),
      estado: true,
    });
    this.getGeneros();
    this.getClasificaciones();
  }

  getGeneros() {
    return this.gService.list('peliculas/genero').subscribe(
      (respuesta: any) => {
        (this.generosList = respuesta), this.checkboxesGeneros();
      },
      (error) => {
        this.error = error;
        this.notificacion.msjValidacion(this.error);
      }
    );
  }

  getClasificaciones() {
    return this.gService
      .list('peliculas/clasificacion')
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: any) => {
          this.clasificaciones = data;
        },
        (error: any) => {
          this.notificacion.mensaje(error.message, error.name, 'error');
        }
      );
  }

  private checkboxesGeneros() {
    this.generosList.forEach(() => {
      const control = new FormControl(); // primer parámetro valor a asignar
      (this.formCreate.controls.generos as FormArray).push(control);
    });
  }

  get generos(): FormArray {
    return this.formCreate.get('generos') as FormArray;
  }
  get genero_id(): FormArray {
    return this.formCreate.get('genero_id') as FormArray;
  }

  onCheckChange(idCheck, event) {
    /* seleccionado */
    if (event.target.checked) {
      // agregar un nuevo control en el array de controles de los identificadores
      (this.formCreate.controls.genero_id as FormArray).push(
        new FormControl(event.target.value)
      );
    } else {
      /* Deseleccionar*/
      // Buscar el elemento que se le quito la selección
      let i = 0;

      this.genero_id.controls.forEach((ctrl: FormControl) => {
        if (idCheck == ctrl.value) {
          // Quitar el elemento deseleccionado del array
          (this.formCreate.controls.genero_id as FormArray).removeAt(i);
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
    this.router.navigate(['/pelicula/all']);
  }
  public errorHandling = (control: string, error: string) => {
    return this.formCreate.controls[control].hasError(error);
  };

  submitForm() {
    console.log(this.formCreate.value);
    this.gService.create('peliculas', this.formCreate.value).subscribe(
      (respuesta: any) => {
        this.Pelicula = respuesta;
        this.router.navigate(['/pelicula/all'], {
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
