import { AuthService } from 'src/app/authguard.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { ClobelObservables } from 'src/app/clobelObservable.service';

@Component({
  selector: 'app-commom',
  templateUrl: './commom.component.html',
  styleUrls: ['./commom.component.css']
})
export class CommomComponent implements OnInit {
  headerShow: any = 'show'
  sideBar: any = false;
  constructor(public auth: AuthService, private obj: ClobelObservables) {

  }

  ngOnInit(): void {
    this.auth.headerShow.subscribe((res: any) => {
      if (this.headerShow != res) {
        setTimeout(() => {
          this.headerShow = res;
        }, 0);
      }
    })
    this.obj.hideSidebar.subscribe((res: any) => {
      this.sideBar = res;
    })

  }

}
