import { Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";

export interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}


@Injectable()
export class PendingChangesGuard implements CanDeactivate<any> {
  canDeactivate(component: ComponentCanDeactivate): any | Observable<any> {
    if (!this.leaveStream) {
      if (confirm('Are you sure you want to leave this page?')) {
        return true;
      } else {
        return false;
      }
    }
    else{
      return true;
    }
  }

  leave_host(type: any) {
    this.leaveStream = type;
  }
  leaveStream = false;
}