import { CreatesubuserComponent } from './createsubuser/createsubuser.component';
import { ManagesubuserComponent } from './managesubuser/managesubuser.component';


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from 'src/app/authguard.service';



const routes: Routes = [
  {
    path: '', children: [
      { path: "", component: ManagesubuserComponent, canActivate: [AuthService], data: { route: '' } },
      { path: "add", component: CreatesubuserComponent, canActivate: [AuthService] },
      { path: "edit", component: CreatesubuserComponent, canActivate: [AuthService] },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Managesubuserroutingmodule { }
