import { AuthService } from 'src/app/authguard.service';
import { AuthcheckService } from './../../authcheck.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ClobelObservables } from 'src/app/clobelObservable.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private router: Router, private authcheck: AuthcheckService, private obj: ClobelObservables, private auth: AuthService) {
    // this.isActive()
  }

  userDetails: any;
  sideBar: any = false;
  ngOnInit(): void {
    // this.isActive()
    this.authcheck.userDetails.subscribe((res: any) => {
      console.log(res, 3123)
      this.userDetails = res;
    })
    this.obj.hideSidebar.subscribe((res: any) => {
      console.log("asdasd")
      this.sideBar = res;
    })


  }
  isActive(type: any) {
    return this.router.isActive("dashboard/" + type, true);
  }
  show_menus(menus: any) {
    if (this.userDetails != null) {

      let access = this.intersect(this.userDetails.roleNum, menus);
      if (access.length == 0) {
        return false;

      }
      else {
        return true;

      }
    }
    else {
      return false;
    }
  }
  intersect(a: any, b: any) {
    return a.filter(Set.prototype.has, new Set(b));
  }

  closeMenu() {
    this.obj.hideSidebar.next(false)
  }
  logout() {
    this.auth.logout()
    // this.closeMenu();

  }
  show_menus_plan() {
    if (this.userDetails != null) {
      return this.userDetails.purchaseplan;
    }
    else {
      return false;
    }
  }
}
