import { AuthcheckService } from './../../authcheck.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authguard.service';
import { HeaderComponent } from 'src/app/header/header.component';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logincomponent',
  templateUrl: './logincomponent.component.html',
  styleUrls: ['./logincomponent.component.css'],
  providers: [HeaderComponent]
})
export class LogincomponentComponent implements OnInit {

  constructor(public auth: AuthService, public api: AuthenticationService, private router: Router, private authchcheck: AuthcheckService) { }
  ngOnInit(): void {
    this.auth.isAuth.next('sign-up')
    this.authchcheck.userDetails.subscribe((res: any) => {
      if (res.sellerType == 'MainSeller' || res.sellerType == 'sub-user') {
        console.log("asdas2312312")
        this.router.navigate(['dashboard']);
      }
      else if (res.sellerType == 'sub-host') {
        this.router.navigate(['stream']);
      }
    })
  }
  Login: any = new FormGroup({
    mobile: new FormControl(null,  [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),
    ]),
    password: new FormControl(null, [Validators.required]),
  })
  errorMessage: any;
  submitted: any = false;
  register_now() {
    this.submitted = true;
    this.errorMessage = null
    if (this.Login.valid) {
      this.submitted = false;
      this.api.login(this.Login.value).subscribe((res: any) => {
        console.log(res)
        localStorage.setItem('sellerAuth', res.access.token)
        this.authchcheck.get_userDetails();
      }, error => {
        console.log(error, 12312)
        this.errorMessage = error.error.message
      })
    }

  }

  
}
