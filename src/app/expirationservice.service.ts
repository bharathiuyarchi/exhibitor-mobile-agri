import { Injectable } from '@angular/core';
import { Observable, interval, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExpirationService {
  private readonly expirationInterval = 2 * 60 * 1000; // 2 minutes
  private stopTimer$ = new Subject<void>();

  constructor() { }

  getExpirationObservable(): Observable<number> {
    return interval(this.expirationInterval).pipe(
      map(() => new Date().getTime()), // Emit the current timestamp every 2 minutes
      takeUntil(this.stopTimer$) // Unsubscribe after a certain duration
    );
  }

  stopTimer() {
    this.stopTimer$.next();
    this.stopTimer$.complete();
  }
}
