import { AuthcheckService } from './../authcheck.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../authguard.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public route: ActivatedRoute, public auth: AuthService, public authcheck: AuthcheckService) {

  }
  show_option: any = '';
  show: any = false;
  ngOnInit(): void {
    this.auth.isAuth.subscribe((res: any) => {
      this.show_option = res;
    })
    console.log(this.auth.isLoggedIn())

    if (this.auth.isLoggedIn()) {
      this.authcheck.get_userDetails()
    }
    this.authcheck.userDetails.subscribe((res: any) => {
      console.log(res, 12312)
    })
    this.authcheck.loaderShow.subscribe((res: any) => {
      this.show = res;
    })

  }
  log_out() {
    this.auth.logout();
  }

}
