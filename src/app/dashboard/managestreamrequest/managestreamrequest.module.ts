import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Managerequestroutingmodule } from './managestreamrequest-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommommoduleModule } from 'src/app/commen/commommodule.module';
import { ManagerequestComponent } from './managerequest/managerequest.component';
import { CreatestreamrequestComponent } from './createstreamrequest/createstreamrequest.component';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    ManagerequestComponent,
    CreatestreamrequestComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    CommommoduleModule,
    Managerequestroutingmodule,
    TranslateModule
  ]
})
export class ManagestreamrequestModule { }
