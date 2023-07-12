import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyprofilesRoutingModule } from './myprofiles-routing.module';
import { ViewprofileComponent } from './viewprofile/viewprofile.component';
import { EditprofilesComponent } from './editprofiles/editprofiles.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CommommoduleModule } from 'src/app/commen/commommodule.module';


@NgModule({
  declarations: [
    ViewprofileComponent,
    EditprofilesComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MyprofilesRoutingModule,
    CommommoduleModule
  ]
})
export class MyprofilesModule { }
