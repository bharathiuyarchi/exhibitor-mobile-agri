import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, of, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RedirectAuthService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.checkLogin().pipe(
      tap(loggedIn => {
        console.log(state.url, 23123, loggedIn)
        if (!loggedIn) {
          // user is not logged in, redirect to login page
          this.router.navigate(['login']);
        } else if (loggedIn) {
          // user is already logged in, redirect to dashboard page
          this.router.navigate(['dashboard']);
        }
      })
    );
  }

  private checkLogin(): Observable<boolean> {
    return of(localStorage.getItem('sellerAuth') !== null);
  }



}
