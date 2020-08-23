import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService } from 'src/app/share/notificacion.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-pelicula-update',
  templateUrl: './pelicula-update.component.html',
  styleUrls: ['./pelicula-update.component.css'],
})
export class PeliculaUpdateComponent implements OnInit {
  Pelicula: any;
  generosList: any;
  clasificaciones: any;
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
    const idPelicula = +this.route.snapshot.paramMap.get('id');
    this.getPelicula(idPelicula); 
  }

  getPelicula(id: number) {
    this.gService.get('peliculas', id).subscribe(
      (respuesta: any) => {
        this.Pelicula = respuesta;
        //Obtenida la información de la pelicula
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
    this.getGeneros();
    this.getClasificaciones();

    if (this.Pelicula) {
      //Cargar la información del videojuego
      //en los controles que conforman el formulario
      this.formUpdate = this.formBuilder.group({
        id: [this.Pelicula.id, [Validators.required]],
        name: [this.Pelicula.name, [Validators.required]],
        sinopsis: [this.Pelicula.sinopsis, [Validators.required]],
        clasificacion_id: [
          this.Pelicula.clasificacion_id,
          [Validators.required],
        ],
        imagen: ['./assets/img_productos/momia.jpg', [Validators.required]],
        generos: this.formBuilder.array([]),
        genero_id: this.formBuilder.array([]),
        estado: [true, [Validators.required]],
      });
    }
  }

  getGeneros() {
    return this.gService.list('peliculas/genero').subscribe(
      (respuesta: any) => {
        (this.generosList = respuesta), this.checkboxPlataformas();
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

  get generos(): FormArray {
    return this.formUpdate.get('generos') as FormArray;
  }
  get genero_id(): FormArray {
    return this.formUpdate.get('genero_id') as FormArray;
  }

  private checkboxPlataformas() {
    //Recorrer la lista de plataformas y especificar si esta seleccionado
    this.generosList.forEach((o) => {
      let selected = false;
      if (this.Pelicula.generos.find((x) => x.id == o.id)) {
        selected = true;
      }
      const control = new FormControl(selected);
      (this.formUpdate.controls.generos as FormArray).push(control);
      if (selected) {
        //Agregar al array de id seleccionados
        (this.formUpdate.controls.genero_id as FormArray).push(
          new FormControl(o.id)
        );
      }
    });
  }

  onCheckChange(idCheck, event) {
    /* seleccionado */
    if (event.target.checked) {
      // agregar un nuevo control en el array de controles de los identificadores
      (this.formUpdate.controls.genero_id as FormArray).push(
        new FormControl(event.target.value)
      );
    } else {
      /* Deseleccionar*/
      // Buscar el elemento que se le quito la selección
      let i = 0;

      this.genero_id.controls.forEach((ctrl: FormControl) => {
        if (idCheck == ctrl.value) {
          // Quitar el elemento deseleccionado del array
          (this.formUpdate.controls.genero_id as FormArray).removeAt(i);
          return;
        }

        i++;
      });
    }
  }

  submitForm() {
    console.log(this.formUpdate.value);
    this.gService.update('peliculas', this.formUpdate.value).subscribe(
      (respuesta: any) => {
        this.Pelicula = respuesta;
        this.router.navigate(['/pelicula/all'], {
          queryParams: { update: 'true' },
        });
      },
      (error) => {
        this.error = error;
        this.notificacion.msjValidacion(this.error);
      }
    );
  }

  onReset() {
    this.formUpdate.reset();
  }
  onBack() {
    this.router.navigate(['/pelicula/all']);
  }
  public errorHandling = (control: string, error: string) => {
    return this.formUpdate.controls[control].hasError(error);
  };

  ngOnInit(): void {}
}
