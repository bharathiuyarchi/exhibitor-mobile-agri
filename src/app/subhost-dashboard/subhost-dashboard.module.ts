import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignedStreamsComponent } from './assigned-streams/assigned-streams.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommommoduleModule } from '../commen/commommodule.module';
import { dashboardroutingmodule } from './dashboard-routing.module';
import { FormatTimePipe, GolivestreamComponent } from './golivestream/golivestream.component';
import { ProductlistshowComponent } from './productlistshow/productlistshow.component';
import { StreamchatComponent } from './streamchat/streamchat.component';
import { PendingChangesGuard_sub } from './can.deactivate.guard';
import { ProductdetailviewComponent_sub } from './productdetailview/productdetailview.component';



@NgModule({
  declarations: [
    AssignedStreamsComponent,
    GolivestreamComponent,
    ProductlistshowComponent,
    StreamchatComponent,
    FormatTimePipe,
    ProductdetailviewComponent_sub
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    CommommoduleModule,
    dashboardroutingmodule,

  ],
  providers:[PendingChangesGuard_sub]

})
export class SubhostDashboardModule { }
