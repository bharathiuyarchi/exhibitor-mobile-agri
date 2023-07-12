import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagepostComponent } from './managepost/managepost.component';
import { CreatepostComponent } from './createpost/createpost.component';
import { Managepostroutingmodule } from './managepost-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommommoduleModule } from 'src/app/commen/commommodule.module';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';



@NgModule({
  declarations: [
    ManagepostComponent,
    CreatepostComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    CommommoduleModule,
    Managepostroutingmodule,
    NgxDaterangepickerMd.forRoot()

  ]
})
export class ManagepostModule { }
