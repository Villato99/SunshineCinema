import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeliculaRoutingModule } from './pelicula-routing.module';
import { PeliculaIndexComponent } from './pelicula-index/pelicula-index.component';
import { PeliculaShowComponent } from './pelicula-show/pelicula-show.component';
import { PeliculaCreateComponent } from './pelicula-create/pelicula-create.component';
import { PeliculaUpdateComponent } from './pelicula-update/pelicula-update.component';
import { PeliculaAllComponent } from './pelicula-all/pelicula-all.component';
//Agregar la referencia en el modulo donde se utilizaran uno o mas formularios reactive
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PeliculaIndexComponent,
    PeliculaShowComponent,
    PeliculaCreateComponent,
    PeliculaUpdateComponent,
    PeliculaAllComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, PeliculaRoutingModule],
})
export class PeliculaModule {}
