import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarteleraRoutingModule } from './cartelera-routing.module';
import { CarteleraIndexComponent } from './cartelera-index/cartelera-index.component';
import { CarteleraShowComponent } from './cartelera-show/cartelera-show.component';

@NgModule({
  declarations: [CarteleraIndexComponent, CarteleraShowComponent],
  imports: [CommonModule, CarteleraRoutingModule],
})
export class CarteleraModule {}
