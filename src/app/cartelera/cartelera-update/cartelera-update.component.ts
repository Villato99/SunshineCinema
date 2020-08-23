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
  selector: 'app-cartelera-update',
  templateUrl: './cartelera-update.component.html',
  styleUrls: ['./cartelera-update.component.css'],
})
export class CarteleraUpdateComponent implements OnInit {
  cartelera: any;
  tiquetesList: any;
  peliculasList: any;
  ubicacionesList: any;
  error: any;
  formUpdate: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public formBuilder: FormBuilder,
    private gService: GenericService,
    private notificacion: NotificacionService
  ) {
    const idCartelera = +this.route.snapshot.paramMap.get('id');
    this.getCartelera(idCartelera);
  }

  getCartelera(id: number) {
    this.gService.get('carteleras/id', id).subscribe(
      (respuesta: any) => {
        this.cartelera = respuesta;
        this.reactiveForm();
      },
      (error) => {
        this.error = error;
        this.notificacion.msjValidacion(this.error);
      }
    );
  }

  reactiveForm() {
    this.getTiquetes();
    this.getPeliculas();
    this.getUbicaciones();

    if (this.cartelera) {
      this.formUpdate = this.formBuilder.group({
        id: [this.cartelera.id, [Validators.required]],
        pelicula_id: [this.cartelera.pelicula_id, [Validators.required]],
        ubicacion_id: [this.cartelera.ubicacion_id, [Validators.required]],
        fechaHora: [this.cartelera.fechaHora, [Validators.required]],
        hora: [this.cartelera.hora, [Validators.required]],
        tiquetes: this.formBuilder.array([]),
        tiquete_id: this.formBuilder.array([]),
        estado: [true, [Validators.required]],
      });
    }
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
    //Recorrer la lista de plataformas y especificar si esta seleccionado
    this.tiquetesList.forEach((o) => {
      let selected = false;
      if (this.cartelera.tiquetes.find((x) => x.id == o.id)) {
        selected = true;
      }
      const control = new FormControl(selected);
      (this.formUpdate.controls.tiquetes as FormArray).push(control);
      if (selected) {
        //Agregar al array de id seleccionados
        (this.formUpdate.controls.tiquete_id as FormArray).push(
          new FormControl(o.id)
        );
      }
    });
  }

  get tiquetes(): FormArray {
    return this.formUpdate.get('tiquetes') as FormArray;
  }
  get tiquete_id(): FormArray {
    return this.formUpdate.get('tiquete_id') as FormArray;
  }

  onCheckChange(idCheck, event) {
    /* seleccionado */
    if (event.target.checked) {
      // agregar un nuevo control en el array de controles de los identificadores
      (this.formUpdate.controls.tiquete_id as FormArray).push(
        new FormControl(event.target.value)
      );
    } else {
      /* Deseleccionar*/
      // Buscar el elemento que se le quito la selección
      let i = 0;

      this.tiquete_id.controls.forEach((ctrl: FormControl) => {
        if (idCheck == ctrl.value) {
          // Quitar el elemento deseleccionado del array
          (this.formUpdate.controls.tiquete_id as FormArray).removeAt(i);
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
    this.router.navigate(['/cartelera/all']);
  }

  public errorHandling = (control: string, error: string) => {
    return this.formUpdate.controls[control].hasError(error);
  };

  submitForm() {
    console.log(this.formUpdate.value);
    this.gService.update('carteleras', this.formUpdate.value).subscribe(
      (respuesta: any) => {
        this.cartelera = respuesta;
        this.router.navigate(['/cartelera/all'], {
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
