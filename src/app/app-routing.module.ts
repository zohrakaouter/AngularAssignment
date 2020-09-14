import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticationComponent } from './authentication/authentication.component';
import { ListCalculationsComponent } from './list-calculations/list-calculations.component';
import {AddCalculationComponent} from "./add-calculation/add-calculation.component";
import {EditCalculationComponent} from "./edit-calculation/edit-calculation.component";

const routes: Routes = [
  { path: 'list-calculations', component: ListCalculationsComponent },
   { path: 'add-calculation', component: AddCalculationComponent },
   { path: 'edit-calculation', component: EditCalculationComponent },

  { path: 'auth/login', component: AuthenticationComponent },

  { path: '**', redirectTo: 'auth/login' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }