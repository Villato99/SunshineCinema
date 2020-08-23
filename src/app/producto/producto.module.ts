import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductoRoutingModule } from './producto-routing.module';
import { ProductoIndexComponent } from './producto-index/producto-index.component';
import { ProductoShowComponent } from './producto-show/producto-show.component';
import { ProductoCreateComponent } from './producto-create/producto-create.component';
import { ProductoUpdateComponent } from './producto-update/producto-update.component';
import { ProductoAllComponent } from './producto-all/producto-all.component';
//Agregar la referencia en el modulo donde se utilizaran uno o mas formularios reactive
import { ReactiveFormsModule } from '@angular/forms';
import { ProductoInactivosComponent } from './producto-inactivos/producto-inactivos.component';

@NgModule({
  declarations: [
    ProductoIndexComponent,
    ProductoShowComponent,
    ProductoCreateComponent,
    ProductoUpdateComponent,
    ProductoAllComponent,
    ProductoInactivosComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, ProductoRoutingModule],
})
export class ProductoModule {}
