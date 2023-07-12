import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthSetpassService implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    const verifiedAccount = localStorage.getItem('verifiedAccount');

    if (verifiedAccount != null) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
