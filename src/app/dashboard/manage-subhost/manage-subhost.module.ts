import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagesubhostComponent } from './managesubhost/managesubhost.component';
import { CreatesubhostComponent } from './createsubhost/createsubhost.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommommoduleModule } from 'src/app/commen/commommodule.module';
import { Managesubhostroutingmodule } from './managesubhost-routing.module';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    ManagesubhostComponent,
    CreatesubhostComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    CommommoduleModule,
    Managesubhostroutingmodule,
    TranslateModule
  ]
})
export class ManageSubhostModule { }
