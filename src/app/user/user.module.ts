import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
//Agregar la referencia en el modulo donde se utilizaran uno o mas formularios reactive
import { ReactiveFormsModule } from '@angular/forms';
import { CreateComponent } from './create/create.component';
import { AdminIndexComponent } from './admin-index/admin-index.component';

@NgModule({
  declarations: [LoginComponent, CreateComponent, AdminIndexComponent],
  imports: [CommonModule, ReactiveFormsModule, UserRoutingModule],
})
export class UserModule {}
