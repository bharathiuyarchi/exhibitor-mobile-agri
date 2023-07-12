import { PostapproveComponent } from './postapprove/postapprove.component';
import { ManagepoststockComponent } from './managepoststock/managepoststock.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from 'src/app/authguard.service';



const routes: Routes = [
  { path: "", component: ManagepoststockComponent, pathMatch: "full", canActivate: [AuthService] },
  { path: "approval", component: PostapproveComponent, pathMatch: "full", canActivate: [AuthService] },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Managepoststockroutingmodule { }
