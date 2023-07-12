import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagesubuserComponent } from './managesubuser/managesubuser.component';
import { CreatesubuserComponent } from './createsubuser/createsubuser.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommommoduleModule } from 'src/app/commen/commommodule.module';
import { Managesubuserroutingmodule } from './managesubuser-routing.module';



@NgModule({
  declarations: [
    ManagesubuserComponent,
    CreatesubuserComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    CommommoduleModule,
    Managesubuserroutingmodule
  ]
})
export class ManageSubuserModule { }
