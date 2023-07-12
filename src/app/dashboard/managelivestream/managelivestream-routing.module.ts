import { AssignHostComponent } from './assign-host/assign-host.component';
import { SetTimeComponent } from './set-time/set-time.component';
import { ManagelivestreamComponent } from './managelivestream/managelivestream.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from 'src/app/authguard.service';
import { GolivestreamComponent } from './golivestream/golivestream.component';
import { PendingChangesGuard } from './can-deactivate.guard';



const routes: Routes = [
  {
    path: '', children: [
      { path: "", component: ManagelivestreamComponent, canActivate: [AuthService] },
      { path: "settime", component: SetTimeComponent, canActivate: [AuthService] },
      { path: "assignhost", component: AssignHostComponent, canActivate: [AuthService] },
      { path: "golive", component: GolivestreamComponent, canActivate: [AuthService],canDeactivate:[PendingChangesGuard] },


    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Managelivestraemroutingmodule { }
