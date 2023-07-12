import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { AuthcheckService } from './../authcheck.service';
import { Component, OnInit } from '@angular/core';
import { HttpInterceptorService } from '../interceptors/http-interceptor.service';

@Component({
  selector: 'app-httploaders',
  templateUrl: './httploaders.component.html',
  styleUrls: ['./httploaders.component.css']
})
export class HttploadersComponent implements OnInit {
  show: any = true;
  ngOnInit(): void {
    setTimeout(() => {
      this.authcheck.loaderShow.next(false)
    }, 500)
    this.authcheck.loaderShow.subscribe((res: any) => {
      this.show = res

    })
    // this.routeSubscription = this.router.events.subscribe(event => {
    //   this.authcheck.loaderShow.next(true)
    //   if (event instanceof NavigationStart) {
    //   }
    //   setTimeout(() => {
    //     this.authcheck.loaderShow.next(false)
    //   }, 500)
    // });
  }
  constructor(private authcheck: AuthcheckService, private router: Router) { }
  routeSubscription: any;
}
