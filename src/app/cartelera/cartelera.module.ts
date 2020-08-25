import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarteleraRoutingModule } from './cartelera-routing.module';
import { CarteleraIndexComponent } from './cartelera-index/cartelera-index.component';
import { CarteleraShowComponent } from './cartelera-show/cartelera-show.component';
import { CarteleraCreateComponent } from './cartelera-create/cartelera-create.component';
import { CarteleraUpdateComponent } from './cartelera-update/cartelera-update.component';
import { CarteleraAllComponent } from './cartelera-all/cartelera-all.component';
//Agregar la referencia en el modulo donde se utilizaran uno o mas formularios reactive
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CarteleraInactivasComponent } from './cartelera-inactivas/cartelera-inactivas.component';
import { CarteleraReservaComponent } from './cartelera-reserva/cartelera-reserva.component';

@NgModule({
  declarations: [
    CarteleraIndexComponent,
    CarteleraShowComponent,
    CarteleraCreateComponent,
    CarteleraUpdateComponent,
    CarteleraAllComponent,
    CarteleraInactivasComponent,
    CarteleraReservaComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CarteleraRoutingModule,
    FormsModule,
  ],
})
export class CarteleraModule {}
