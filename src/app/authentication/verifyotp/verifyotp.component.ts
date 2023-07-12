import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-verifyotp',
  templateUrl: './verifyotp.component.html',
  styleUrls: ['./verifyotp.component.css']
})
export class VerifyotpComponent {

  constructor(private api: AuthenticationService, private router: Router) {

  }
  submitted: any = false;
  errorMessage: any;
  verify_otp() {
    this.submitted = true;
    this.errorMessage = null;
    this.verifyOTP.patchValue({
      mobileNumber: localStorage.getItem('mobileNumber')
    })
    if (this.verifyOTP.valid) {
      this.submitted = false;
      this.api.verifyOTP(this.verifyOTP.value).subscribe((res: any) => {
        console.log(res)
        localStorage.removeItem('mobileNumber')
        localStorage.setItem('verifiedAccount', res.access.token)
        this.router.navigate(['setpassword'])
      }, error => {
        this.errorMessage = error;
      })
    }
  }

  verifyOTP: any = new FormGroup({
    mobileNumber: new FormControl(null, [Validators.required]),
    otp: new FormControl(null, [Validators.required]),
  })
}
