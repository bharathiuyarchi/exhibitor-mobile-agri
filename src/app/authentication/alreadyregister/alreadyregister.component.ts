import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-alreadyregister',
  templateUrl: './alreadyregister.component.html',
  styleUrls: ['./alreadyregister.component.css']
})
export class AlreadyregisterComponent {
  constructor(public api: AuthenticationService, private router: Router) { }

  submitted: any = false;
  errorMessage: any;
  already_user() {
    this.submitted = true;
    this.errorMessage = null;
    if (this.alreadyuser.valid) {
      this.submitted = false;
      this.api.alreadyUser(this.alreadyuser.value).subscribe((res: any) => {
        localStorage.setItem('mobileNumber', res.mobileNumber);
        this.router.navigate(['verifyotp'])
        console.log(res)

      }, error => {
        this.errorMessage = error;
      })
    }

  }

  alreadyuser: any = new FormGroup({
    mobileNumber: new FormControl(null, [Validators.required])
  })
} 
