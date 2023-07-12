import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InitialstocksComponent } from './initialstocks/initialstocks.component';
import { InitialstockproductComponent } from './initialstockproduct/initialstockproduct.component';
import { InitialstockpendingproductsComponent, Timedefrence } from './initialstockpendingproducts/initialstockpendingproducts.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommommoduleModule } from 'src/app/commen/commommodule.module';
import { Managenitialstockroutingmodule } from './initialstock-routing.module';



@NgModule({
  declarations: [
    InitialstocksComponent,
    InitialstockproductComponent,
    InitialstockpendingproductsComponent,
    Timedefrence
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    CommommoduleModule,
    Managenitialstockroutingmodule
  ]
})
export class InitialstockmanagerModule { }
