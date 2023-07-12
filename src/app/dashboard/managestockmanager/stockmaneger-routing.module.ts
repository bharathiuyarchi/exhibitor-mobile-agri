import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from 'src/app/authguard.service';



const routes: Routes = [
  { path: "", redirectTo: 'initalstocks', pathMatch: 'full' },
  { path: "initalstocks", loadChildren: () => import('./initialstockmanager/initialstockmanager.module').then((m) => m.InitialstockmanagerModule), canActivate: [AuthService], data: { route: 'dashboard/stock/initalstocks' } },
  { path: "initalbuyer", loadChildren: () => import('./intimation-buyer-manager/intimation-buyer-manager.module').then((m) => m.IntimationBuyerManagerModule), canActivate: [AuthService], data: { route: 'dashboard/stock/initalbuyer' } },
  { path: "poststcok", loadChildren: () => import('./post-stock-approval/post-stock-approval.module').then((m) => m.PostStockApprovalModule), canActivate: [AuthService], data: { route: 'dashboard/stock/poststcok' } },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Managestockmanagerroutingmodule { }
