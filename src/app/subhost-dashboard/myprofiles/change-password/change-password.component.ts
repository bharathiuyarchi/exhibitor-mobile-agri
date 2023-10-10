import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MyprofileService } from '../myprofile.service';
import { AuthService } from 'src/app/authguard.service';
import { ConfirmPasswordValidator } from 'src/app/validators/passowdMacth.validators';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent_sub implements OnInit {

  ngOnInit(): void {
    // this.changepassword = this.fb.group({
    //   oldpassword: new FormControl(null, Validators.required),
    //   password: new FormControl(null, [Validators.required,]),
    //   repassword: new FormControl(null, [Validators.required,]),
    // }, { validator: ConfirmPasswordValidator("password", "repassword")})
    // console.log(this.changepassword.value)
  }
  constructor(private fb: FormBuilder, private api: MyprofileService, private auth: AuthService) {

    this.changepassword = this.fb.group({
      oldpassword: new FormControl(null, Validators.required),
      password: new FormControl(null, [Validators.required,]),
      repassword: new FormControl(null, [Validators.required,]),
    }, { validator: ConfirmPasswordValidator("password", "repassword") })

  }

  get myform() {
    return this.changepassword.controls
  }

keyup(){
  this.showError2 = false
}

  changepassword: any;
  showError:boolean=false
  showError2:boolean=false
  submitted:boolean=false
  change_pass() {
    this.showError=false
    this.submitted=true
    if(this.changepassword.get('password')?.value !== this.changepassword.get('repassword')?.value){
      this.showError=true
      console.log(this.showError,'sdfsf')
    }
    if (this.changepassword.valid && !this.showError) {
      this.api.chanagepassword(this.changepassword.value).subscribe((res: any) => {
        this.showError2=false
        console.log(res)
        this.auth.logout()
      },error=>{
        console.log(error.error,error.error.message)
        if( error.error.message=="Password Doesn't Match"){
          this.showError2=true
        }
      })
    }
  }
}
