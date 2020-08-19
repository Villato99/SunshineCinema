import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarteleraIndexComponent } from './cartelera-index/cartelera-index.component';
import { CarteleraShowComponent } from './cartelera-show/cartelera-show.component';

const routes: Routes = [
  { path: 'cartelera/cartelera-index', component: CarteleraIndexComponent },
  { path: 'cartelera/show', component: CarteleraShowComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarteleraRoutingModule {}
