import { AuthcheckService } from './authcheck.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './authguard.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

  constructor(private authGuard: AuthService, private router: Router, public authcheck: AuthcheckService) { }

  async canActivate() {
    const isLoggedIn = this.authGuard.isLoggedIn();
    if (isLoggedIn) {
      await this.authcheck.get_userDetails();
      await this.authcheck.userDetails.subscribe((res: any) => {
        console.log(res)
        if (res.sellerType == 'MainSeller' || res.sellerType == 'sub-user') {
          this.router.navigate(['dashboard']);
        }
        else if (res.sellerType == 'sub-host') {
          this.router.navigate(['stream']);
        }
      })
      return false;
    } else {
      return true;
    }
  }
}