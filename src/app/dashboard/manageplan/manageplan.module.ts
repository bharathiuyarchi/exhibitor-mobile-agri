import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageplanComponent } from './manageplan/manageplan.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommommoduleModule } from 'src/app/commen/commommodule.module';
import { Managepostroutingmodule } from './managepost-routing.module';
import { PlanViewsComponent } from './plan-views/plan-views.component';
import { ListPlansComponent, ListPlansComponentShow } from './list-plans/list-plans.component';



@NgModule({
  declarations: [
    ManageplanComponent,
    PlanViewsComponent,
    ListPlansComponent,
    ListPlansComponentShow
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    CommommoduleModule,
    Managepostroutingmodule
  ]
})
export class ManageplanModule { }
