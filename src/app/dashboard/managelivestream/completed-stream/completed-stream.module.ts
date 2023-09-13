import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompletestreamComponent, Hourformat } from './completestream/completestream.component';
import { CompletestreamRoutingModule } from './completestream-routing.module';
import { CommommoduleModule } from 'src/app/commen/commommodule.module';
import { BrowserModule } from '@angular/platform-browser';
import { VideopreviewComponent } from './videopreview/videopreview.component';



@NgModule({
  declarations: [
    CompletestreamComponent,
    VideopreviewComponent,
    Hourformat
  ],
  imports: [
    CommonModule,
    CompletestreamRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommommoduleModule,
    FormsModule,
  ]
})
export class CompletedStreamModule { }
