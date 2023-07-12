import { ChangePasswordComponent_sub } from './change-password/change-password.component';
import { EditprofilesComponent_sub } from './editprofiles/editprofiles.component';
import { ViewprofileComponent_sub } from './viewprofile/viewprofile.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "", component: ViewprofileComponent_sub },
  { path: "edit", component: EditprofilesComponent_sub ,pathMatch:"full"},
  { path: "changepassword", component: ChangePasswordComponent_sub },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyprofilesRoutingModule { }
