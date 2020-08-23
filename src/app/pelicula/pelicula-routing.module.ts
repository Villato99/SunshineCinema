import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeliculaIndexComponent } from './pelicula-index/pelicula-index.component';
import { PeliculaShowComponent } from './pelicula-show/pelicula-show.component';
import { PeliculaCreateComponent } from './pelicula-create/pelicula-create.component';
import { PeliculaUpdateComponent } from './pelicula-update/pelicula-update.component';
import { PeliculaAllComponent } from './pelicula-all/pelicula-all.component';
import { AuthGuardService } from '../share/auth-guard.service';
import { RolGuardService } from '../share/rol-guard.service';
import { PeliculaInactivasComponent } from './pelicula-inactivas/pelicula-inactivas.component';

const routes: Routes = [
  { path: 'pelicula', component: PeliculaIndexComponent },
  {
    path: 'pelicula/all',
    component: PeliculaAllComponent,
    canActivate: [AuthGuardService, RolGuardService],
    data: { expectedRole: 1 },
  },
  {
    path: 'pelicula/inactivas',
    component: PeliculaInactivasComponent,
    canActivate: [AuthGuardService, RolGuardService],
    data: { expectedRole: 1 },
  },
  {
    path: 'pelicula/create',
    component: PeliculaCreateComponent,
    canActivate: [AuthGuardService, RolGuardService],
    data: { expectedRole: 1 },
  },
  {
    path: 'pelicula/update/:id',
    component: PeliculaUpdateComponent,
    canActivate: [AuthGuardService, RolGuardService],
    data: { expectedRole: 1 },
  },
  { path: 'pelicula/:id', component: PeliculaShowComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PeliculaRoutingModule {}
