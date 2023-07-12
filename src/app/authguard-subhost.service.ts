import { AuthcheckService } from './authcheck.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AuthService } from './authguard.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceSubhost implements CanActivate {

  constructor(private router: Router, public authcheck: AuthcheckService, public auth: AuthService) { }

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    this.auth.isAuth.next('dashboard')
    const isLoggedIn = localStorage.getItem('sellerAuth');
    let path: any = route;
    if (isLoggedIn != null) {
      await this.authcheck.get_userDetails();
      return new Promise<boolean>((resolve, reject) => {
        this.authcheck.userDetails.subscribe((res: any) => {
          if (res.sellerType == 'MainSeller' || res.sellerType == 'sub-user') {
            this.router.navigate(['404']);
            resolve(false);
          }
          else if (res.sellerType == 'sub-host') {
            resolve(true);
          }
        })
      })
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
