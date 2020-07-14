import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeliculaRoutingModule } from './pelicula-routing.module';
import { PeliculaIndexComponent } from './pelicula-index/pelicula-index.component';
import { PeliculaShowComponent } from './pelicula-show/pelicula-show.component';


@NgModule({
  declarations: [PeliculaIndexComponent, PeliculaShowComponent],
  imports: [
    CommonModule,
    PeliculaRoutingModule
  ]
})
export class PeliculaModule { }
