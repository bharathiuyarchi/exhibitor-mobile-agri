import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyprofilesRoutingModule } from './myprofiles-routing.module';
import { ViewprofileComponent_sub } from './viewprofile/viewprofile.component';
import { EditprofilesComponent_sub } from './editprofiles/editprofiles.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ChangePasswordComponent_sub } from './change-password/change-password.component';
import { CommommoduleModule } from 'src/app/commen/commommodule.module';


@NgModule({
  declarations: [
    ViewprofileComponent_sub,
    EditprofilesComponent_sub,
    ChangePasswordComponent_sub
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
export class MyprofilesModule_sub { }
