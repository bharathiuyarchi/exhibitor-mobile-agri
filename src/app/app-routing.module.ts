import { VerifyotpComponent } from './authentication/verifyotp/verifyotp.component';
import { SetpasswordComponent } from './authentication/setpassword/setpassword.component';
import { AlreadyregisterComponent } from './authentication/alreadyregister/alreadyregister.component';
import { ForgotpasswordComponent } from './authentication/forgotpassword/forgotpassword.component';
import { FooterComponent } from './footer/footer.component';
import { RegistercomponentComponent } from './authentication/registercomponent/registercomponent.component';
import { LogincomponentComponent } from './authentication/logincomponent/logincomponent.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoAuthGuard } from './noauthguard.service';
import { AuthService } from './authguard.service';
import { AuthServiceSubhost } from './authguard-subhost.service';
import { Error404Component } from './error404/error404.component';

const routes: Routes = [
  { path: "", redirectTo: 'login', pathMatch: 'full' },
  { path: "login", component: LogincomponentComponent, canActivate: [NoAuthGuard] },
  { path: "register", component: RegistercomponentComponent, canActivate: [NoAuthGuard] },
  { path: "forgot", component: ForgotpasswordComponent, canActivate: [NoAuthGuard] },
  { path: "already-user", component: AlreadyregisterComponent, canActivate: [NoAuthGuard] },
  { path: "setpassword", component: SetpasswordComponent, canActivate: [NoAuthGuard] },
  { path: "verifyotp", component: VerifyotpComponent, canActivate: [NoAuthGuard] },
  { path: "dashboard", loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule), canActivate: [AuthService], data: { role: [1, 2, 3, 4, 5], route: 'dashboard' } },
  { path: "stream", loadChildren: () => import('./subhost-dashboard/subhost-dashboard.module').then((m) => m.SubhostDashboardModule), canActivate: [AuthServiceSubhost] },
  { path: "404", component: Error404Component },
  { path: "**", component: Error404Component },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
