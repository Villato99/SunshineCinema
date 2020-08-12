import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { GenericService } from 'src/app/share/generic.service';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { NotificacionService } from 'src/app/share/notificacion.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  usuario: any;
  roles: any;
  error: any;
  formCreate: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private gService: GenericService,
    private authService: AuthenticationService,
    private notificacion: NotificacionService
  ) {
    this.reactiveForm();
  }

  reactiveForm() {
    this.formCreate = this.fb.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      //quiza asignar un rol general -ver requerimientos
      //rol_id: ['', [Validators.required]],
    });
    //this.getRoles();
  }

  ngOnInit(): void {}

  submitForm() {
    this.authService.createUser(this.formCreate.value).subscribe(
      (respuesta: any) => {
        this.usuario = respuesta;
        this.router.navigate(['/usuario/login'], {
          queryParams: { register: 'true' },
        });
      },
      (error) => {
        this.error = error;
        this.notificacion.msjValidacion(this.error);
      }
    );
  }
  onReset() {
    this.formCreate.reset();
  }

  getRoles() {
    this.gService
      .list('videojuegos/roles')
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: any) => {
          this.roles = data;
        },
        (error: any) => {
          this.notificacion.mensaje(error.message, error.name, 'error');
        }
      );
  }

  public errorHandling = (control: string, error: string) => {
    return this.formCreate.controls[control].hasError(error);
  };
}
