import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeliculaIndexComponent } from './pelicula-index/pelicula-index.component';
import { PeliculaShowComponent } from './pelicula-show/pelicula-show.component';


const routes: Routes = [
  { path: 'pelicula', component: PeliculaIndexComponent },
  { path: 'pelicula/:id', component: PeliculaShowComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeliculaRoutingModule { }
