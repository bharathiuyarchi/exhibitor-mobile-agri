import { CreatesubhostComponent } from './createsubhost/createsubhost.component';
import { ManagesubhostComponent } from './managesubhost/managesubhost.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from 'src/app/authguard.service';



const routes: Routes = [
  {
    path: '', children: [
      { path: "", component: ManagesubhostComponent, canActivate: [AuthService] },
      { path: "add", component: CreatesubhostComponent, canActivate: [AuthService] },
      { path: "edit", component: CreatesubhostComponent, canActivate: [AuthService] },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Managesubhostroutingmodule { }
