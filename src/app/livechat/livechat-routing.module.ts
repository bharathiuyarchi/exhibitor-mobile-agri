import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LivechatComponent } from './livechat/livechat.component';

const routes: Routes = [
  { path: "", component: LivechatComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LivechatRoutingModule { }
