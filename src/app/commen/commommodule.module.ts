import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { CommenComponent } from './commen.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ToggleMenusComponent } from '../toggle-menus/toggle-menus.component';
import { BackbuttonComponent } from '../backbutton/backbutton.component';
import { NewHeaderComponent } from '../new-header/new-header.component';
import { ProgressbarComponent } from '../progressbar/progressbar.component';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    CommenComponent,
    ToggleMenusComponent,
    BackbuttonComponent,
    NewHeaderComponent,
    ProgressbarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    TranslateModule
  ],
  providers: [FooterComponent, HeaderComponent, ToggleMenusComponent, BackbuttonComponent],
  exports: [FooterComponent, HeaderComponent, CommenComponent, ToggleMenusComponent, BackbuttonComponent, NewHeaderComponent,ProgressbarComponent]
})
export class CommommoduleModule { }
