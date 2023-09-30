import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AuthcheckService } from 'src/app/authcheck.service';
import { AuthService } from 'src/app/authguard.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-viewprofile',
  templateUrl: './viewprofile.component.html',
  styleUrls: ['./viewprofile.component.css']
})
export class ViewprofileComponent implements OnInit {
  userDetails: any;
  store: any = [];
  ngOnInit(): void {
    this.authcheck.get_userDetails();
    this.authcheck.userDetails.subscribe((res: any) => {
      console.log(res, 123123)
      this.userDetails = res;
    })
  }
  constructor(private auth: AuthService, private authcheck: AuthcheckService, private http: HttpClient) {

  }

  logout() {
    this.auth.logout();
  }
  showEnqSubmit=false

  show=1;
  changeShow(v:number){
    this.show=v
    this.showEnqSubmit=false
  }
}
