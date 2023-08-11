import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ManageOrdersComponent } from "./manage-orders/manage-orders.component";
import { StreamOrdersComponent } from "./stream-orders/stream-orders.component";
import { OrderViewComponent } from "./order-view/order-view.component";

const routes: Routes = [
  { path: "", component: ManageOrdersComponent },
  { path: "view/:id", component: StreamOrdersComponent },
  {
    path: "orderView/:id",
    component: OrderViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageorderRoutingModule {}
