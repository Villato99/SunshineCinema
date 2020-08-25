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
  selector: 'app-cartelera-create',
  templateUrl: './cartelera-create.component.html',
  styleUrls: ['./cartelera-create.component.css'],
})
export class CarteleraCreateComponent implements OnInit {
  cartelera: any;
  tiquetesList: any;
  peliculasList: any;
  ubicacionesList: any;
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
      pelicula_id: ['', [Validators.required]],
      ubicacion_id: ['', [Validators.required]],
      fechaHora: ['', [Validators.required]],
      hora: ['', [Validators.required]],
      estado: [true, [Validators.required]],
      tiquetes: this.formBuilder.array([]),
      tiquete_id: this.formBuilder.array([]),
    });
    this.getTiquetes();
    this.getPeliculas();
    this.getUbicaciones();
  }

  getTiquetes() {
    return this.gService.list('carteleras/tiquete').subscribe(
      (respuesta: any) => {
        (this.tiquetesList = respuesta), this.checkboxesTiquetes();
      },
      (error) => {
        this.error = error;
        this.notificacion.msjValidacion(this.error);
      }
    );
  }

  getPeliculas() {
    return this.gService
      .list('peliculas')
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: any) => {
          this.peliculasList = data;
        },
        (error: any) => {
          this.notificacion.mensaje(error.message, error.name, 'error');
        }
      );
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

  private checkboxesTiquetes() {
    this.tiquetesList.forEach(() => {
      const control = new FormControl(); // primer parámetro valor a asignar
      (this.formCreate.controls.tiquetes as FormArray).push(control);
    });
  }

  get tiquetes(): FormArray {
    return this.formCreate.get('tiquetes') as FormArray;
  }
  get tiquete_id(): FormArray {
    return this.formCreate.get('tiquete_id') as FormArray;
  }

  onCheckChange(idCheck, event) {
    /* seleccionado */
    if (event.target.checked) {
      // agregar un nuevo control en el array de controles de los identificadores
      (this.formCreate.controls.tiquete_id as FormArray).push(
        new FormControl(event.target.value)
      );
    } else {
      /* Deseleccionar*/
      // Buscar el elemento que se le quito la selección
      let i = 0;

      this.tiquete_id.controls.forEach((ctrl: FormControl) => {
        if (idCheck == ctrl.value) {
          // Quitar el elemento deseleccionado del array
          (this.formCreate.controls.tiquete_id as FormArray).removeAt(i);
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
    this.router.navigate(['/cartelera/all']);
  }

  public errorHandling = (control: string, error: string) => {
    return this.formCreate.controls[control].hasError(error);
  };

  submitForm() {
    console.log(this.formCreate.value);

    this.gService.create('carteleras', this.formCreate.value).subscribe(
      (respuesta: any) => {
        this.cartelera = respuesta;
        this.router.navigate(['/cartelera/all'], {
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
