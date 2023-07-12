import { CreatepostComponent } from './managepost/createpost/createpost.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoAuthGuard } from '../noauthguard.service';
import { AuthService } from '../authguard.service';
import { CommomComponent } from './commom/commom.component';


const routes: Routes = [
  {
    path: '', component: CommomComponent, data: { role: [1, 2, 3, 4, 5], route: 'dashboard' }, children: [
      { path: "", component: HomepageComponent, pathMatch: "full", canActivate: [AuthService], data: { role: [1, 2, 3, 4, 5], route: 'dashboard' } },
      { path: "post", loadChildren: () => import('./managepost/managepost.module').then((m) => m.ManagepostModule), canActivate: [AuthService], data: { role: [1], route: 'dashboard/post' } },
      { path: "stream", loadChildren: () => import('./managestreamrequest/managestreamrequest.module').then((m) => m.ManagestreamrequestModule), canActivate: [AuthService], data: { role: [1], route: 'dashboard/stream' } },
      { path: "livestream", loadChildren: () => import('./managelivestream/managelivestream.module').then((m) => m.ManagelivestreamModule), canActivate: [AuthService], data: { role: [1], route: 'dashboard/livestream' } },
      { path: "plan", loadChildren: () => import('./manageplan/manageplan.module').then((m) => m.ManageplanModule), canActivate: [AuthService], data: { role: [1], route: 'dashboard/plan' } },
      { path: "subuser", loadChildren: () => import('./manage-subuser/manage-subuser.module').then((m) => m.ManageSubuserModule), canActivate: [AuthService], data: { role: [1], route: 'dashboard/subuser' } },
      { path: "subhost", loadChildren: () => import('./manage-subhost/manage-subhost.module').then((m) => m.ManageSubhostModule), canActivate: [AuthService], data: { role: [1], route: 'dashboard/subhost' } },
      { path: "stock", loadChildren: () => import('./managestockmanager/managestockmanager.module').then((m) => m.ManagestockmanagerModule), canActivate: [AuthService], data: { role: [1, 2], route: 'dashboard/stock' } },
      { path: "myprofile", loadChildren: () => import('./myprofiles/myprofiles.module').then((m) => m.MyprofilesModule), canActivate: [AuthService], data: { role: [1], route: 'dashboard/stream' } },
      // { path: "post/add", component: CreatepostComponent }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class dashboardroutingmodule { }
