import { GolivestreamComponent } from './golivestream/golivestream.component';
import { AssignedStreamsComponent } from './assigned-streams/assigned-streams.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoAuthGuard } from '../noauthguard.service';
import { AuthService } from '../authguard.service';
import { PendingChangesGuard_sub } from './can.deactivate.guard';


const routes: Routes = [
  { path: '', component: AssignedStreamsComponent, pathMatch: "full" },
  { path: 'golive', component: GolivestreamComponent,canDeactivate:[PendingChangesGuard_sub] },
  { path: 'profile', loadChildren: () => import("./myprofiles/myprofiles.module").then((m: any) => m.MyprofilesModule_sub)},

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class dashboardroutingmodule { }
