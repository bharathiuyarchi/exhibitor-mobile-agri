import { Router } from '@angular/router';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError, BehaviorSubject, finalize, forkJoin } from 'rxjs';
import { AuthcheckService } from '../authcheck.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private router: Router, private authcheck: AuthcheckService) { }
  showloader: any = false;
  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   // alert("asdas")
  //   if (!this.showloader) {
  //     setTimeout(() => {
  //       this.authcheck.change_header(true)
  //     }, 0)
  //     this.showloader = true;
  //   }
  //   let token: any = localStorage.getItem('sellerAuth') == null ? '' : localStorage.getItem('sellerAuth');
  //   const modifiedRequest = req.clone({
  //     headers: req.headers.set('sellerAuth', token),
  //   });
  //   return next.handle(modifiedRequest).pipe(
  //     tap((data) => {
  //       console.log()
  //       setTimeout(() => {
  //         if (this.showloader) {
  //           this.authcheck.change_header(false)
  //           this.showloader = false;
  //         }
  //         return data;
  //       }, 500)
  //     }),
  //     catchError((error: HttpErrorResponse) => {
  //       console.log("asdas")
  //       let errorMessage = '';

  //       if (error.error instanceof ErrorEvent) {
  //         errorMessage = `Error: ${error.error.message}`;
  //       } else {
  //         if (error.status === 401) {
  //           errorMessage = `Unauthorized access`;
  //           localStorage.removeItem('sellerAuth')
  //           this.router.navigate([''])
  //         }
  //         else {
  //           errorMessage = error.error.message;
  //         }
  //       }
  //       setTimeout(() => {
  //         if (this.showloader) {
  //           this.authcheck.change_header(false)
  //           this.showloader = false;
  //         }
  //       }, 300)
  //       return throwError(errorMessage);
  //     })
  //   )
  // }

  private activeRequests = 0;

  // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   this.activeRequests++;
  //   let token: any = localStorage.getItem('sellerAuth') == null ? '' : localStorage.getItem('sellerAuth');
  //   const modifiedRequest = request.clone({
  //     headers: request.headers.set('sellerAuth', token),
  //   });
  //   if (!this.showloader) {
  //     setTimeout(() => {
  //       this.authcheck.change_header(true)
  //     }, 0)
  //     this.showloader = true;
  //   }
  //   return next.handle(modifiedRequest).pipe(
  //     tap(
  //       event => {
  //       },
  //       error => {
  //         this.activeRequests--;
  //         if (this.activeRequests === 0) {
  //           this.showloader = false;
  //           setTimeout(() => {
  //             this.authcheck.change_header(false)
  //           }, 500)
  //         }
  //       }
  //     ),
  //     catchError((error: HttpErrorResponse) => {
  //       let errorMessage = '';

  //       if (error.error instanceof ErrorEvent) {
  //         errorMessage = error.error.message;

  //       } else {
  //         if (error.status === 401) {
  //           errorMessage = `Unauthorized access`;
  //           localStorage.removeItem('sellerAuth')
  //           this.router.navigate([''])
  //         }
  //         else {
  //           errorMessage = error.error.message;
  //         }
  //       }
  //       this.activeRequests = 0;
  //       this.showloader = false;
  //       setTimeout(() => {
  //         this.authcheck.change_header(false)
  //       }, 500)
  //       return throwError(errorMessage);
  //     }),
  //     finalize(() => {
  //       this.activeRequests--;
  //       if (this.activeRequests === 0) {
  //         // close loader
  //         setTimeout(() => {
  //           this.authcheck.change_header(false)
  //         }, 500)
  //         this.showloader = false;
  //       }
  //     })
  //   );
  // }
  private requests = 0; // Counter to keep track of ongoing requests

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.requests++;
    let token: any = localStorage.getItem('sellerAuth') == null ? '' : localStorage.getItem('sellerAuth');
    const modifiedRequest = request.clone({
      headers: request.headers.set('sellerAuth', token),
    });
    if (!this.showloader) {
      setTimeout(() => {
        this.authcheck.change_header(true)
      }, 0)
      this.showloader = true;
    }
    return next.handle(modifiedRequest).pipe(
      tap(
        () => { },
        (error) => {
          let errorMessage = '';

          if (error.error instanceof ErrorEvent) {
            errorMessage = error.error.message;

          } else {
            if (error.status === 401) {
              errorMessage = `Unauthorized access`;
              localStorage.removeItem('sellerAuth')
              this.router.navigate([''])
            }
            else {
              errorMessage = error.error.message;
            }
          }
          this.requests--;
          if (this.requests === 0) {
            this.showloader = false;
            setTimeout(() => {
              this.authcheck.change_header(false)
            }, 500)
          }
          return throwError(errorMessage);
        },
        () => {
          this.requests--;
          if (this.requests === 0) {
            this.showloader = false;
            setTimeout(() => {
              this.authcheck.change_header(false)
            }, 500)
          }
        }
      )
    );
  }

}
