import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChooseSlotsComponent } from './choose-slots/choose-slots.component';
import { ManageSlotsComponent } from './manage-slots/manage-slots.component';
import { ViewSlotsComponent } from './view-slots/view-slots.component';
import { SlotsRoutingModule } from './slots-routing.module';
import { CommommoduleModule } from "../../commen/commommodule.module";



@NgModule({
    declarations: [
        ManageSlotsComponent,
        ViewSlotsComponent,
        ChooseSlotsComponent
    ],
    imports: [
        CommonModule,
        SlotsRoutingModule,
        CommommoduleModule
    ]
})
export class SlotsModule { }
