import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-verifyotp',
  templateUrl: './verifyotp.component.html',
  styleUrls: ['./verifyotp.component.css']
})
export class VerifyotpComponent implements OnInit {

  constructor(private api: AuthenticationService, private router: Router) {

  }
  ngOnInit(): void {
   this.number=localStorage.getItem('mobileNumber')
  }
  
  submitted: any = false;
  errorMessage: any;
  number:any;
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
       
          this.errorMessage = error.error.message

          console.log(this.errorMessage)
      
        
      })
    }
  }
  resend(){
    let data={
      mobileNumber:this.number
    }
    this.api.forgetPassword(data).subscribe((res:any)=>{

    })
  }
  verifyOTP: any = new FormGroup({
    mobileNumber: new FormControl(null, [Validators.required]),
    otp: new FormControl(null, [Validators.required,Validators.minLength(6),
      Validators.maxLength(6)]),
  })
}
