import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommomComponent } from './commom/commom.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommommoduleModule } from '../commen/commommodule.module';
import { dashboardroutingmodule } from './dashboard-routing.module';
import { DemostreamComponent } from './demostream/demostream.component';
import { TranslateModule } from '@ngx-translate/core';





@NgModule({
  declarations: [
    CommomComponent,
    HomepageComponent,
    SidebarComponent,  
    DemostreamComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    CommommoduleModule,
    dashboardroutingmodule,
    TranslateModule
  ]
})
export class DashboardModule { }
