import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarteleraIndexComponent } from './cartelera-index/cartelera-index.component';
import { CarteleraShowComponent } from './cartelera-show/cartelera-show.component';
import { CarteleraCreateComponent } from './cartelera-create/cartelera-create.component';
import { CarteleraUpdateComponent } from './cartelera-update/cartelera-update.component';
import { CarteleraAllComponent } from './cartelera-all/cartelera-all.component';
import { AuthGuardService } from '../share/auth-guard.service';
import { RolGuardService } from '../share/rol-guard.service';
import { CarteleraInactivasComponent } from './cartelera-inactivas/cartelera-inactivas.component';

const routes: Routes = [
  { path: 'cartelera/cartelera-index', component: CarteleraIndexComponent },
  {
    path: 'cartelera/all',
    component: CarteleraAllComponent,
    canActivate: [AuthGuardService, RolGuardService],
    data: { expectedRole: 1 },
  },
  {
    path: 'cartelera/inactivas',
    component: CarteleraInactivasComponent,
    canActivate: [AuthGuardService, RolGuardService],
    data: { expectedRole: 1 },
  },
  {
    path: 'cartelera/create',
    component: CarteleraCreateComponent,
    canActivate: [AuthGuardService, RolGuardService],
    data: { expectedRole: 1 },
  },
  {
    path: 'cartelera/update/:id',
    component: CarteleraUpdateComponent,
    canActivate: [AuthGuardService, RolGuardService],
    data: { expectedRole: 1 },
  },
  { path: 'cartelera/:id', component: CarteleraShowComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarteleraRoutingModule {}
