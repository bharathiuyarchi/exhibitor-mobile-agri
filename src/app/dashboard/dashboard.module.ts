import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommomComponent } from './commom/commom.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommommoduleModule } from '../commen/commommodule.module';
import { dashboardroutingmodule } from './dashboard-routing.module';
import { ManagepostModule } from './managepost/managepost.module';



@NgModule({
  declarations: [
    CommomComponent,
    HomepageComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    CommommoduleModule,
    dashboardroutingmodule,
  ]
})
export class DashboardModule { }
