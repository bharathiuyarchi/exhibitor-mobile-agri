import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagepostComponent } from './managepost/managepost.component';
import { CreatepostComponent, discount_calculate, get_obj_value } from './createpost/createpost.component';
import { Managepostroutingmodule } from './managepost-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommommoduleModule } from 'src/app/commen/commommodule.module';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { AgmCoreModule } from '@agm/core';
import { TranslateCompiler, TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [
    ManagepostComponent,
    CreatepostComponent,
    get_obj_value,
    discount_calculate
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    CommommoduleModule,
    Managepostroutingmodule,
    GooglePlaceModule,
    NgxDaterangepickerMd.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyARM6-Qr_hsR53GExv9Gmu9EtFTV5ZuDX4',
      libraries: ['places']
    }),
    TranslateModule
  ]
})
export class ManagepostModule { }
