import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/authguard.service';
import { AuthenticationService } from '../authentication.service';
import { NumberOnlyService } from 'src/app/number-only.service';

@Component({
  selector: 'app-registercomponent',
  templateUrl: './registercomponent.component.html',
  styleUrls: ['./registercomponent.component.css']
})
export class RegistercomponentComponent implements OnInit {
  constructor(public auth: AuthService, public api: AuthenticationService, private router: Router ,private number: NumberOnlyService) {

  }
  category: any [] =['Agri Ecology','Agricultural Building Contractors','Agricultural Machinery & Equipment','Agro and Food Processing','Aquaculture'
  ,'Biotechnology','Fertilizers & Chemicals','Floriculture','Fork lift & Handling Equipment','Greenhouses','Horticulture','Irrigation and water technologies'
  ,'Livestock and diary farming','Organic agriculture','plant protection','plasticulture','post harvest treatment','poultry','precise agriculture','R&D'
  ,'Renewable energy','rural development','seeds,nurseries and plant propogation materials','small ruminants','hardware&software','veterinary','Turnkey projects and knowledge transfer']
   
  know:any []=['Facebook','Whatsapp','Newspaper','Outdoor Content','Telecaling','Website']
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
    tradeName:new FormControl(null,Validators.required),
    companyName:new FormControl(null,Validators.required),
    Designation:new FormControl(null,Validators.required),
    webSite:new FormControl(null,Validators.required),
    category:new FormControl(null,Validators.required),
    how_did_you_know_us:new FormControl(null,Validators.required),
    mobileNumber: new FormControl(null, [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    address: new FormControl(null, [Validators.required]),
    country: new FormControl(null, [Validators.required]),
    state: new FormControl(null, [Validators.required]),
    city: new FormControl(null, [Validators.required]),
    Pincode: new FormControl(null, [Validators.required, Validators.maxLength(6), Validators.minLength(6), Validators.pattern("^((\\+91-?)|0)?[0-9]{6}$")])
  })
  get loginerror(): any {
    return this.registerForm.controls;
  }
  only_ten_degist(event: any, num: any) {
    return this.number.number_service(event, num)
  }
}
