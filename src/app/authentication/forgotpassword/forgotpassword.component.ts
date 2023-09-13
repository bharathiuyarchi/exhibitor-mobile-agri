import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  submitted: any = false;
  constructor(public api: AuthenticationService, private router: Router,
    private arouter: ActivatedRoute) {

  }
  errorMessage: any;
  cr: any;
  ngOnInit(): void {
    this.arouter.queryParams.subscribe((res: any) => {
      this.cr = res['cr']
    })
    console.log(this.cr, 'asdfsdf')
  }
  forget_password() {
    this.errorMessage = null;
    this.submitted = true;
    if (this.forgetPassword.valid) {
      this.submitted = false;
      if (this.cr) {
        console.log('continue register')
        this.api.continueRegister(this.forgetPassword.value).subscribe((res: any) => {
          localStorage.setItem('mobileNumber', res.mobileNumber);
          this.router.navigate(['verifyotp'], { replaceUrl: true })
        }, error => {
          this.errorMessage = error.error.message;
        })
      }
      else {
        this.submitted = false;
        this.api.forgetPassword(this.forgetPassword.value).subscribe((res: any) => {
          localStorage.setItem('mobileNumber', res.mobileNumber);
          this.router.navigate(['verifyotp'], { replaceUrl: true })
        }, error => {
          this.errorMessage = error.error.message;
        })
      }
    }
  }

  forgetPassword = new FormGroup({
    mobileNumber: new FormControl(null, [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),
    ])
  })
}
