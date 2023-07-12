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
  category: any [] =['Agri Ecology','Agricultural Building Contractors','Agricultural Machinery & Equipment','Agro and Food Processing','Aquaculture'
  ,'Biotechnology','Fertilizers & Chemicals','Floriculture','Fork lift & Handling Equipment','Greenhouses','Horticulture','Irrigation and water technologies'
  ,'Livestock and diary farming','Organic agriculture','plant protection','plasticulture','post harvest treatment','poultry','precise agriculture','R&D'
  ,'Renewable energy','rural development','seeds,nurseries and plant propogation materials','small ruminants','hardware&software','veterinary','Turnkey projects and knowledge transfer']
  ngOnInit(): void {
    console.log("on")
    this.getshopTypes()
    this.authcheck.userDetails.subscribe((res: any) => {
      console.log(res, 1231224323242331)
      this.mydetails.patchValue({
        email: res.email,
        Pincode: res.Pincode,
        address: res.address,
        tradeName: res.tradeName,
        country: res.country,
        city: res.city,
        mobileNumber:res.mobileNumber,
        Designation: res.Designation,
        webSite: res.webSite,
        companyName: res.companyName,
        category:res.category,
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
  submitted:boolean=false;
  mydetails: any = new FormGroup({
    tradeName: new FormControl(null, [Validators.required]),
    email: new FormControl(null,[Validators.required,Validators.email]),
    companyName:new FormControl(null,Validators.required),
    Designation:new FormControl(null,Validators.required),
    webSite:new FormControl(null,Validators.required),
    category: new FormControl(null,Validators.required),
    city: new FormControl(null, [Validators.required]),
    mobileNumber: new FormControl(null,  [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    Pincode: new FormControl(null, [Validators.required, Validators.maxLength(6), Validators.minLength(6), Validators.pattern("^((\\+91-?)|0)?[0-9]{6}$")]),
    address: new FormControl(null, [Validators.required]),
    country: new FormControl(null, Validators.required),
    state: new FormControl(null, Validators.required),
  })
  update_now() {
    this.submitted=true;
    console.log(this.mydetails.valid)
    if (this.mydetails.valid) {
      this.api.update_profile(this.mydetails.value).subscribe((res: any) => {
        // this.authcheck.get_userDetails()
        this.authcheck.userDetails.next(res)
        this.submitted=false
        // this.router.navigateByUrl("dashboard/myprofile")
        window.history.back()
      })
    }
  }
}
