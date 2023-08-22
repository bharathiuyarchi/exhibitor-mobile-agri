import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagelivestreamComponent } from './managelivestream/managelivestream.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommommoduleModule } from 'src/app/commen/commommodule.module';
import { Managelivestraemroutingmodule } from './managelivestream-routing.module';
import { SetTimeComponent } from './set-time/set-time.component';
import { AssignHostComponent } from './assign-host/assign-host.component';
import { FormatTimePipe, GolivestreamComponent } from './golivestream/golivestream.component';
import { StreamchatComponent } from './streamchat/streamchat.component';
import { ProductlistshowComponent } from './productlistshow/productlistshow.component';
import { ProductdetailviewComponent } from './productdetailview/productdetailview.component';
import { PendingChangesGuard } from './can-deactivate.guard';
import { MinutedDef, RaisehandsComponent } from './raisehands/raisehands.component';



@NgModule({
  declarations: [
    ManagelivestreamComponent,
    SetTimeComponent,
    AssignHostComponent,
    GolivestreamComponent,
    StreamchatComponent,
    ProductlistshowComponent,
    FormatTimePipe,
    ProductdetailviewComponent,
    RaisehandsComponent,
    MinutedDef
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    CommommoduleModule,
    Managelivestraemroutingmodule,

  ],
  providers: [PendingChangesGuard]

})
export class ManagelivestreamModule { }
