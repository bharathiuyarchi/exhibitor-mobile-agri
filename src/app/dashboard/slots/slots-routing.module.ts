import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageSlotsComponent } from './manage-slots/manage-slots.component';
import { ViewSlotsComponent } from './view-slots/view-slots.component';
import { ChooseSlotsComponent } from './choose-slots/choose-slots.component';

const routes: Routes=[
  {path:'',component:ManageSlotsComponent},
  {path:'view-slots',component:ViewSlotsComponent},
  {path:'choose-slots',component:ChooseSlotsComponent},

]

@NgModule({
  
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class SlotsRoutingModule { }
