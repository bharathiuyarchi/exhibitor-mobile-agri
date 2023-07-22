import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent {
  submitted: any = false;
  constructor(public api: AuthenticationService, private router: Router) {

  }
  errorMessage: any;
  forget_password() {
    this.errorMessage = null;
    this.submitted = true;
    if (this.forgetPassword.valid) {
      this.submitted=false;
      this.api.forgetPassword(this.forgetPassword.value).subscribe((res: any) => {
        localStorage.setItem('mobileNumber', res.mobileNumber);
        this.router.navigate(['verifyotp'])
      }, error => {
        this.errorMessage = error;
      })
    }
  }

  forgetPassword = new FormGroup({
    mobileNumber: new FormControl(null,[
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),
    ])
  })
}
