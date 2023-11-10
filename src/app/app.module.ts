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
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


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
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })


  ],
  providers: [AuthenticationModule, CommommoduleModule,
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent],
  exports: [CommonModule, FormsModule, CommommoduleModule]
})
export class AppModule {
  constructor(private translate: TranslateService
  ) {
    // this.translate.addLangs(['en', 'nl', 'el', 'de', 'fr', 'es', 'it', 'pt', 'bg', 'tr', 'ru', 'hi', 'ja']);
    let lang: any = localStorage.getItem('language');
    if (lang == null) {
      localStorage.setItem('language', 'en');
    }
    lang = lang == null ? 'en' : lang
    this.translate.setDefaultLang(lang);
  }
}


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}