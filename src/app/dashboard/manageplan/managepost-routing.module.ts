import { PlanViewsComponent } from './plan-views/plan-views.component';
import { ListPlansComponent } from './list-plans/list-plans.component';
import { ManageplanComponent } from './manageplan/manageplan.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from 'src/app/authguard.service';



const routes: Routes = [
  { path: "", component: ManageplanComponent, pathMatch: "full", canActivate: [AuthService] },
  {
    path: "plans", children: [
      {path:'',component: ListPlansComponent, },
      { path: "view", component: PlanViewsComponent, },

    ]
  },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Managepostroutingmodule { }
