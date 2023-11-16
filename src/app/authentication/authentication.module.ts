import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogincomponentComponent } from './logincomponent/logincomponent.component';
import { RegistercomponentComponent } from './registercomponent/registercomponent.component';
import { HeaderComponent } from '../header/header.component';
import { CommommoduleModule } from '../commen/commommodule.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { SetpasswordComponent } from './setpassword/setpassword.component';
import { VerifyotpComponent } from './verifyotp/verifyotp.component';
import { AlreadyregisterComponent } from './alreadyregister/alreadyregister.component';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    LogincomponentComponent,
    RegistercomponentComponent,
    ForgotpasswordComponent,
    SetpasswordComponent,
    VerifyotpComponent,
    AlreadyregisterComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    CommommoduleModule,
    TranslateModule

  ],
  exports: [LogincomponentComponent]
})
export class AuthenticationModule { }
