import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LivechatRoutingModule } from './livechat-routing.module';
import { LivechatComponent } from './livechat/livechat.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LivechatComponent
  ],
  imports: [
    CommonModule,
    LivechatRoutingModule,
    ReactiveFormsModule,
    FormsModule

  ]
})
export class LivechatModule { }
