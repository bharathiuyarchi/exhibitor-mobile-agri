import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChooseSlotsComponent } from './choose-slots/choose-slots.component';
import { ManageSlotsComponent } from './manage-slots/manage-slots.component';
import { ViewSlotsComponent } from './view-slots/view-slots.component';
import { SlotsRoutingModule } from './slots-routing.module';
import { CommommoduleModule } from "../../commen/commommodule.module";
import { ToastrModule } from 'ngx-toastr';
import { SlotPipe } from './slot.pipe';



@NgModule({
    declarations: [
        ManageSlotsComponent,
        ViewSlotsComponent,
        ChooseSlotsComponent,
        SlotPipe
    ],
    imports: [
        CommonModule,
        SlotsRoutingModule,
        CommommoduleModule,
        ToastrModule.forRoot({
            timeOut: 10000,
            positionClass: 'toast-bottom-right',
            preventDuplicates: true,
          }),
    ]
})
export class SlotsModule { }
