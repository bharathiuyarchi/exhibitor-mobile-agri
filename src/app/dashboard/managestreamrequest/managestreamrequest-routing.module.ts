import { CreatestreamrequestComponent } from './createstreamrequest/createstreamrequest.component';
import { ManagerequestComponent } from './managerequest/managerequest.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from 'src/app/authguard.service';



const routes: Routes = [
  {
    path: '', children: [
      { path: "", component: ManagerequestComponent, canActivate: [AuthService] },
      { path: "add", component: CreatestreamrequestComponent, canActivate: [AuthService] },
      { path: "edit", component: CreatestreamrequestComponent, canActivate: [AuthService] },

      
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Managerequestroutingmodule { }
