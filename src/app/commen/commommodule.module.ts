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



@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    CommenComponent,
    ToggleMenusComponent,
    BackbuttonComponent,
    NewHeaderComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    
  ],
  providers: [FooterComponent, HeaderComponent, ToggleMenusComponent, BackbuttonComponent],
  exports: [FooterComponent, HeaderComponent, CommenComponent, ToggleMenusComponent, BackbuttonComponent, NewHeaderComponent,]
})
export class CommommoduleModule { }
