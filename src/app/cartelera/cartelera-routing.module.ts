import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarteleraIndexComponent } from './cartelera-index/cartelera-index.component';
import { CarteleraShowComponent } from './cartelera-show/cartelera-show.component';
import { CarteleraCreateComponent } from './cartelera-create/cartelera-create.component';
import { CarteleraUpdateComponent } from './cartelera-update/cartelera-update.component';
import { CarteleraAllComponent } from './cartelera-all/cartelera-all.component';

const routes: Routes = [
  { path: 'cartelera/cartelera-index', component: CarteleraIndexComponent },
  { path: 'cartelera/all', component: CarteleraAllComponent },
  { path: 'cartelera/:id', component: CarteleraShowComponent },
  { path: 'cartelera/create', component: CarteleraCreateComponent },
  { path: 'cartelera/update/:id', component: CarteleraUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarteleraRoutingModule {}
