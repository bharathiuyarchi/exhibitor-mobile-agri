import { CreatepostComponent } from './createpost/createpost.component';
import { ManagepostComponent } from './managepost/managepost.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from 'src/app/authguard.service';



const routes: Routes = [
  { path: "", component: ManagepostComponent, pathMatch: "full", canActivate: [AuthService], data: { route: "dashboard/post" } },
  { path: "add", component: CreatepostComponent, canActivate: [AuthService], data: { route: "dashboard/post/add" } },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Managepostroutingmodule { }
