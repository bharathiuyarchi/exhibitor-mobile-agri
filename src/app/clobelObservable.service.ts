import { AuthcheckService } from './authcheck.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ClobelObservables {
    headerShow = new BehaviorSubject<any>(false);
    hideSidebar = new BehaviorSubject<any>(false);
}
