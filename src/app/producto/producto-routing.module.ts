import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductoIndexComponent } from './producto-index/producto-index.component';
import { ProductoShowComponent } from './producto-show/producto-show.component';
import { ProductoUpdateComponent } from './producto-update/producto-update.component';
import { ProductoCreateComponent } from './producto-create/producto-create.component';
import { ProductoAllComponent } from './producto-all/producto-all.component';
import { AuthGuardService } from '../share/auth-guard.service';
import { RolGuardService } from '../share/rol-guard.service';
import { ProductoInactivosComponent } from './producto-inactivos/producto-inactivos.component';

const routes: Routes = [
  {
    path: 'producto/all',
    component: ProductoAllComponent,
    canActivate: [AuthGuardService, RolGuardService],
    data: { expectedRole: 1 },
  },
  {
    path: 'producto/inactivos',
    component: ProductoInactivosComponent,
    canActivate: [AuthGuardService, RolGuardService],
    data: { expectedRole: 1 },
  },
  { path: 'producto', component: ProductoIndexComponent },
  {
    path: 'producto/create',
    component: ProductoCreateComponent,
    canActivate: [AuthGuardService, RolGuardService],
    data: { expectedRole: 1 },
  },
  {
    path: 'producto/update/:id',
    component: ProductoUpdateComponent,
    canActivate: [AuthGuardService, RolGuardService],
    data: { expectedRole: 1 },
  },
  { path: 'producto/:id', component: ProductoShowComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductoRoutingModule {}
