import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { InicioComponent } from './inicio/inicio.component';
import { AcercaComponent } from './acerca/acerca.component';

@NgModule({
  declarations: [InicioComponent, AcercaComponent],
  imports: [CommonModule, HomeRoutingModule],
  exports: [InicioComponent],
})
export class HomeModule {}
