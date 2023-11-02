import { CreatepostComponent } from "./managepost/createpost/createpost.component";
import { HomepageComponent } from "./homepage/homepage.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NoAuthGuard } from "../noauthguard.service";
import { AuthService } from "../authguard.service";
import { CommomComponent } from "./commom/commom.component";
import { ManageOrdersComponent } from "./manageorder/manage-orders/manage-orders.component";
import { StreamOrdersComponent } from "./manageorder/stream-orders/stream-orders.component";
import { DemostreamComponent } from "./demostream/demostream.component";

const routes: Routes = [
  {
    path: "",
    component: CommomComponent,
    data: { role: [1, 2, 3, 4, 5], route: "dashboard" },
    children: [
      {
        path: "",
        component: HomepageComponent,
        pathMatch: "full",
        canActivate: [AuthService],
        data: { role: [1, 2, 3, 4, 5], route: "dashboard" },
      },
      {
        path: "post",
        loadChildren: () =>
          import("./managepost/managepost.module").then(
            (m) => m.ManagepostModule
          ),
        canActivate: [AuthService],
        data: { role: [1], route: "dashboard/post" },
      },
      {
        path: "slots",
        loadChildren: () =>
          import("./slots/slots.module").then((m) => m.SlotsModule),
        canActivate: [AuthService],
        data: { role: [1, 2, 3, 4, 5], route: "dashboard/slot" },
      },
      {
        path: "stream",
        loadChildren: () =>
          import("./managestreamrequest/managestreamrequest.module").then(
            (m) => m.ManagestreamrequestModule
          ),
        canActivate: [AuthService],
        data: { role: [1], route: "dashboard/stream" },
      },
      {
        path: "livestream",
        loadChildren: () =>
          import("./managelivestream/managelivestream.module").then(
            (m) => m.ManagelivestreamModule
          ),
        canActivate: [AuthService],
        data: { role: [1], route: "dashboard/livestream" },
      },
      {
        path: "plan",
        loadChildren: () =>
          import("./manageplan/manageplan.module").then(
            (m) => m.ManageplanModule
          ),
        canActivate: [AuthService],
        data: { role: [1], route: "dashboard/plan" },
      },
      {
        path: "subuser",
        loadChildren: () =>
          import("./manage-subuser/manage-subuser.module").then(
            (m) => m.ManageSubuserModule
          ),
        canActivate: [AuthService],
        data: { role: [1], route: "dashboard/subuser" },
      },
      {
        path: "subhost",
        loadChildren: () =>
          import("./manage-subhost/manage-subhost.module").then(
            (m) => m.ManageSubhostModule
          ),
        canActivate: [AuthService],
        data: { role: [1], route: "dashboard/subhost" },
      },
      {
        path: "stock",
        loadChildren: () =>
          import("./managestockmanager/managestockmanager.module").then(
            (m) => m.ManagestockmanagerModule
          ),
        canActivate: [AuthService],
        data: { role: [1, 2], route: "dashboard/stock" },
      },
      {
        path: "myprofile",
        loadChildren: () =>
          import("./myprofiles/myprofiles.module").then(
            (m) => m.MyprofilesModule
          ),
        canActivate: [AuthService],
        data: { role: [1], route: "dashboard/stream" },
      },
      {
        path: "manag-orders",
        loadChildren: () =>
          import("./manageorder/manageorder.module").then(
            (m) => m.ManageorderModule
          ),
        canActivate: [AuthService],
        data: { role: [1], route: "dashboard/stream" },
      },
      { path: "demostream", component: DemostreamComponent, data: { role: [1], route: "demo" }, canActivate: [AuthService], },

    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class dashboardroutingmodule { }
