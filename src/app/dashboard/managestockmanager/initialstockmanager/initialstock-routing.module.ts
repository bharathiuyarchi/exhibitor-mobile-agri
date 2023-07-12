import { InitialstockpendingproductsComponent } from './initialstockpendingproducts/initialstockpendingproducts.component';
import { InitialstockproductComponent } from './initialstockproduct/initialstockproduct.component';
import { InitialstocksComponent } from './initialstocks/initialstocks.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from 'src/app/authguard.service';



const routes: Routes = [
  { path: "", component: InitialstocksComponent, pathMatch: 'full', canActivate: [AuthService], data: { route: "dashboard/stock/initalstocks" } },
  {
    path: "stockproudct", children: [
      { path: "", component: InitialstockproductComponent, canActivate: [AuthService], data: { route: "dashboard/stock/initalstocks/stockproudct" } },
      { path: "pendingstock", component: InitialstockpendingproductsComponent, pathMatch: 'full', canActivate: [AuthService], data: { route: "dashboard/stock/initalstocks/stockproudct/pendingstock" } },
    ]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Managenitialstockroutingmodule { }
