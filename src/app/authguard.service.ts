import { AuthcheckService } from './authcheck.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  constructor(private router: Router, public authcheck: AuthcheckService) { }
  intersect(a: any, b: any) {
    return a.filter(Set.prototype.has, new Set(b));
  }
  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    const isLoggedIn = localStorage.getItem('sellerAuth');
    let path: any = route.data;
    if (isLoggedIn != null) {
      this.isAuth.next('dashboard')
      await this.authcheck.get_userDetails();
      return new Promise<boolean>((resolve, reject) => {
        this.authcheck.userDetails.subscribe((res: any) => {
          if (res.sellerType == 'MainSeller' || res.sellerType == 'sub-user') {
            if (path.role) {
              let access = this.intersect(path.role, res.roleNum)
              if (access.length != 0) {
                resolve(true);
              }
              else {
                this.router.navigate(['404']);
                resolve(false);
              }
            }
            else {
              this.router.navigate(['404']);
              resolve(false);
            }
          }
          else if (res.sellerType == 'sub-host') {
            this.router.navigate(['404']);
            resolve(false);
          }
        })
      })
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  isLoggedIn() {
    const isLoggedIn = localStorage.getItem('sellerAuth');
    return isLoggedIn != null;
  }
  islogin() {
    const isLoggedIn = localStorage.getItem('sellerAuth');
    return isLoggedIn != null ? 'dashboard' : 'sign-up';
  }


  isAuth = new BehaviorSubject<any>(this.islogin());

  headerShow = new BehaviorSubject<any>('show');

  change_header(type: any) {
    this.headerShow.next(type)
  }

  // login() {
  //   localStorage.setItem('isLoggedIn', 'true');
  //   this.router.navigate(['dashboard']);
  //   this.islogin();
  // }

  logout() {
    localStorage.removeItem('sellerAuth');
    location.href = '/login'

  }

}
