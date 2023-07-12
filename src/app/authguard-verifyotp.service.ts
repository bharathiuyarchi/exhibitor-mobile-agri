import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthVerifyOTPService implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    const mobileNumber = localStorage.getItem('mobileNumber');

    if (mobileNumber != null) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
