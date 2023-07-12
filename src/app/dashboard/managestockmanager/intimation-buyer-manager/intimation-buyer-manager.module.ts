import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntimationbuyermanagerComponent } from './intimationbuyermanager/intimationbuyermanager.component';
import { BuyerviewComponent } from './buyerview/buyerview.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommommoduleModule } from 'src/app/commen/commommodule.module';
import { Initialbuyerrouting } from './initialstock-routing.module';



@NgModule({
  declarations: [
    IntimationbuyermanagerComponent,
    BuyerviewComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    CommommoduleModule,
    Initialbuyerrouting
  ]
})
export class IntimationBuyerManagerModule { }
