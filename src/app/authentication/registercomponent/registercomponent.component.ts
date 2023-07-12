import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/authguard.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-registercomponent',
  templateUrl: './registercomponent.component.html',
  styleUrls: ['./registercomponent.component.css']
})
export class RegistercomponentComponent implements OnInit {
  constructor(public auth: AuthService, public api: AuthenticationService, private router: Router) {

  }
  ngOnInit(): void {
    this.auth.isAuth.next('login')
  }
  submitted: any = false;
  errorMessage: any;
  login_now() {
    this.submitted = true;
    this.errorMessage = null;
    console.log(this.registerForm.value)

    if (this.registerForm.valid) {
      this.submitted = false;
      this.api.register_seller(this.registerForm.value).subscribe((res: any) => {
        console.log(res)
        localStorage.setItem('mobileNumber', res.mobileNumber);
        this.router.navigate(['verifyotp'])
      }, error => {
        console.log(error)
        this.errorMessage = error.error.message
      })
    }
  }
  registerForm = new FormGroup({
    tradeName: new FormControl(null, [Validators.required]),
    businessType: new FormControl(null, [Validators.required]),
    contactName: new FormControl(null, [Validators.required]),
    mobileNumber: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required]),
    address: new FormControl(null, [Validators.required]),
    country: new FormControl(null, [Validators.required]),
    state: new FormControl(null, [Validators.required]),
    city: new FormControl(null, [Validators.required]),
    Pincode: new FormControl(null, [Validators.required]),
  })
}
