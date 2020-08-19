import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { NotificacionService } from 'src/app/share/notificacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  infoUsuario: any;
  error: any;
  formulario: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    public fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
    private notificacion: NotificacionService
  ) {
    //Si esta logueado que lo redireccione
    if (authService.currentUserValue) {
      this.router.navigate(['/']);
    }
    this.reactiveForm();
  }
  /* Definir formulario y la validación */
  reactiveForm() {
    /*https://angular.io/guide/reactive-forms
       https://angular.io/api/forms/Validators */
    this.formulario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  mensajes() {
    let register = false;
    // Mensajes
    this.route.queryParams.subscribe((params) => {
      register = params.register || false;
    });
    if (register) {
      this.notificacion.mensaje(
        'Usuario',
        'Registro de usuario satisfactorio! Por favor especifique las credenciales para ingresar!',
        'success'
      );
    }
  }
  ngOnInit(): void {
    this.mensajes();
  }

  submitForm() {
    //Reglas de validación de Angular inválidas
    if (this.formulario.invalid) {
      return;
    }
    //console.log(this.formulario.value);
    this.authService.loginUser(this.formulario.value).subscribe(
      (respuesta: any) => {
        (this.infoUsuario = respuesta),
          this.router.navigate([
            this.infoUsuario.rol_id == 2 ? '/' : '/user/admin-index',
          ]);
      },
      (error: any) => {
        this.error = error;
        this.notificacion.msjValidacion(this.error);
      }
    );
  }
  onReset() {
    this.formulario.reset();
  }
  /* Manejar errores de formulario en Angular */
  public errorHandling = (control: string, error: string) => {
    return this.formulario.controls[control].hasError(error);
  };
}
