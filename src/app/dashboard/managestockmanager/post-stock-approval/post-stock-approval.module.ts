import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagepoststockComponent } from './managepoststock/managepoststock.component';
import { PostapproveComponent } from './postapprove/postapprove.component';
import { Managepoststockroutingmodule } from './poststock-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommommoduleModule } from 'src/app/commen/commommodule.module';



@NgModule({
  declarations: [
    ManagepoststockComponent,
    PostapproveComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    CommommoduleModule,
    Managepoststockroutingmodule
  ]
})
export class PostStockApprovalModule { }
