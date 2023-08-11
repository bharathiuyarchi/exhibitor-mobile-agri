import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageorderRoutingModule } from './manageorder-routing.module';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommommoduleModule } from 'src/app/commen/commommodule.module';
import { StreamOrdersComponent } from './stream-orders/stream-orders.component';
import { OrderViewComponent } from './order-view/order-view.component';


@NgModule({
  declarations: [
    ManageOrdersComponent,
    StreamOrdersComponent,
    OrderViewComponent
  ],
  imports: [
    CommonModule,
    ManageorderRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    CommommoduleModule,
  ]
})
export class ManageorderModule { }
