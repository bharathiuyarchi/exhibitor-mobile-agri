import { Router } from '@angular/router';
import { Component, HostListener, OnInit, AfterViewChecked } from '@angular/core';
import { AuthService } from './authguard.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, AfterViewChecked {

  constructor(public auth: AuthService, private location: Location, private router: Router) { }
  title = 'vegitables';
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    console.log(event.target.innerWidth);
    if (event.target.innerWidth < 1200) {
      // window.location.href = 'http://localhost:59164'
      console.log(2312)
    }

  }
  isloged: any = false;
  ngOnInit(): void {

    if (localStorage.getItem('loggedIn') === 'true') {
      this.location.replaceState('/dashboard');
    }

    if (window.innerWidth < 1200) {
      // window.location.href = 'http://localhost:59164'
    }

  }

  login() {
    // this.auth.login()
  }
  logout() {
    // this.auth.logout()
  }
  headerShow: any = 'show';

  ngAfterViewChecked(): void {
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.

  }


}
