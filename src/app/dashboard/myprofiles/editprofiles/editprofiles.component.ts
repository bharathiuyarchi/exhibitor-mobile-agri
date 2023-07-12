import { Router } from '@angular/router';
import { AuthcheckService } from 'src/app/authcheck.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { MyprofileService } from '../myprofile.service';

@Component({
  selector: 'app-editprofiles',
  templateUrl: './editprofiles.component.html',
  styleUrls: ['./editprofiles.component.css']
})
export class EditprofilesComponent implements OnInit {


  constructor(private api: MyprofileService, private authcheck: AuthcheckService, private router: Router) {
    console.log("cons")

  }
  ngOnInit(): void {
    console.log("on")
    this.getshopTypes()
    this.authcheck.userDetails.subscribe((res: any) => {
      console.log(res, 1231224323242331)
      this.mydetails.patchValue({
        email: res.email,
        contactName: res.contactName,
        Pincode: res.Pincode,
        address: res.address,
        tradeName: res.tradeName,
        country: res.country,
        city: res.city,
        mobileNumber: res.mobileNumber,
        businessType: res.businessType,
        state: res.state
      })
    })

  }
  shopTypes: any;

  getshopTypes() {
    this.api.get_shop_types().subscribe((res: any) => {
      console.log(res)
      this.shopTypes = res;
    })
  }

  mydetails: any = new FormGroup({
    tradeName: new FormControl(null, [Validators.required]),
    email: new FormControl(null,),
    city: new FormControl(null, [Validators.required]),
    mobileNumber: new FormControl(null, [Validators.required]),
    contactName: new FormControl(null, [Validators.required]),
    Pincode: new FormControl(null, [Validators.required]),
    address: new FormControl(null, [Validators.required]),
    country: new FormControl(null, Validators.required),
    state: new FormControl(null, Validators.required),
    businessType: new FormControl(null, Validators.required),
  })
  update_now() {
    console.log(this.mydetails.valid)
    if (this.mydetails.valid) {
      this.api.update_profile(this.mydetails.value).subscribe((res: any) => {
        // this.authcheck.get_userDetails()
        this.authcheck.userDetails.next(res)
        // this.router.navigateByUrl("dashboard/myprofile")
        window.history.back()
      })
    }
  }
}
