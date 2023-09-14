import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationModule } from './authentication/authentication.module';
import { CommenComponent } from './commen/commen.component';
import { CommommoduleModule } from './commen/commommodule.module';
import { Error404Component } from './error404/error404.component';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './interceptors/http-interceptor.service';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { HttploadersComponent } from './httploaders/httploaders.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { AgmCoreModule } from '@agm/core'


@NgModule({
  declarations: [
    AppComponent,
    Error404Component,
    HttploadersComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthenticationModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    CommommoduleModule,
    RouterModule,
    HttpClientModule,
    NgxDaterangepickerMd.forRoot(),
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    GooglePlaceModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyARM6-Qr_hsR53GExv9Gmu9EtFTV5ZuDX4',
    }),


  ],
  providers: [AuthenticationModule, CommommoduleModule,
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent],
  exports: [CommonModule, FormsModule, CommommoduleModule]
})
export class AppModule { }
