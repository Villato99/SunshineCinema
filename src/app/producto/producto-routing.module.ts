import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductoIndexComponent } from './producto-index/producto-index.component';
import { ProductoShowComponent } from './producto-show/producto-show.component';

const routes: Routes = [
  { path: 'producto', component: ProductoIndexComponent },
  { path: 'producto/:id', component: ProductoShowComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductoRoutingModule {}
