import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommommoduleModule } from 'src/app/commen/commommodule.module';
import { Managestockmanagerroutingmodule } from './stockmaneger-routing.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    CommommoduleModule,
    Managestockmanagerroutingmodule
  ]
})
export class ManagestockmanagerModule { }
