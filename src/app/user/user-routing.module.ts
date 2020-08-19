import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CreateComponent } from './create/create.component';
import { AdminIndexComponent } from './admin-index/admin-index.component';

const routes: Routes = [
  { path: 'user/login', component: LoginComponent },
  { path: 'user/create', component: CreateComponent },
  { path: 'user/admin-index', component: AdminIndexComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
