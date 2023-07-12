import { BuyerviewComponent } from './buyerview/buyerview.component';
import { IntimationbuyermanagerComponent } from './intimationbuyermanager/intimationbuyermanager.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from 'src/app/authguard.service';



const routes: Routes = [
  { path: "", component: IntimationbuyermanagerComponent, pathMatch: 'full', canActivate: [AuthService], data: { route: "dashboard/stock/initalbuyer" } },
  { path: "buyerview", component: BuyerviewComponent, pathMatch: 'full', canActivate: [AuthService], data: { route: "dashboard/stock/initalbuyer/buyerview" } },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Initialbuyerrouting { }
