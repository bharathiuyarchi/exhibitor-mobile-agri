import { Router } from "@angular/router";
import { AuthcheckService } from "src/app/authcheck.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  OnChanges,
  OnInit,
} from "@angular/core";
import { MyprofileService } from "../myprofile.service";

@Component({
  selector: "app-editprofiles",
  templateUrl: "./editprofiles.component.html",
  styleUrls: ["./editprofiles.component.css"],
})
export class EditprofilesComponent implements OnInit {
  constructor(
    private api: MyprofileService,
    private authcheck: AuthcheckService,
    private router: Router
  ) {
    console.log("cons");
  }
  category: any[] = [
    "Agri Ecology",
    "Agricultural Building Contractors",
    "Agricultural Machinery & Equipment",
    "Agro and Food Processing",
    "Aquaculture",
    "Biotechnology",
    "Fertilizers & Chemicals",
    "Floriculture",
    "Fork lift & Handling Equipment",
    "Greenhouses",
    "Horticulture",
    "Irrigation and water technologies",
    "Livestock and diary farming",
    "Organic agriculture",
    "plant protection",
    "plasticulture",
    "post harvest treatment",
    "poultry",
    "precise agriculture",
    "R&D",
    "Renewable energy",
    "rural development",
    "seeds,nurseries and plant propogation materials",
    "small ruminants",
    "hardware&software",
    "veterinary",
    "Turnkey projects and knowledge transfer",
  ];
  know: any[] = [
    "Facebook",
    "Whatsapp",
    "Newspaper",
    "Outdoor Content",
    "Telecaling",
    "Website",
  ];
  ngOnInit(): void {
    console.log("on");
    this.getshopTypes();
    this.getCountry()
    this.authcheck.userDetails.subscribe((res: any) => {
      console.log(res, 1231224323242331);
      this.mydetails.patchValue({
        email: res.email,
        Pincode: res.Pincode,
        address: res.address,
        tradeName: res.tradeName,
        country: res.country,
        city: res.city,
        mobileNumber: res.mobileNumber,
        Designation: res.Designation,
        webSite: res.webSite,
        companyName: res.companyName,
        category: res.category,
        businessType: res.businessType,
        state: res.state,
        how_did_you_know_us: res.how_did_you_know_us,
        GST_Number: res.GST_Number,
      });
    });
  }
  shopTypes: any;

  getshopTypes() {
    this.api.get_shop_types().subscribe((res: any) => {
      console.log(res);
      this.shopTypes = res;
    });
  }
  submitted: boolean = false;
  mydetails: any = new FormGroup({
    tradeName: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    companyName: new FormControl(null, Validators.required),
    Designation: new FormControl(null, Validators.required),
    webSite: new FormControl(null),
    category: new FormControl([], Validators.required),
    city: new FormControl(null, [Validators.required]),
    mobileNumber: new FormControl(null, [
      Validators.required,
      Validators.maxLength(10),
      Validators.minLength(10),
      Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),
    ]),
    Pincode: new FormControl(null, [
      Validators.required,
      Validators.maxLength(6),
      Validators.minLength(6),
      Validators.pattern("^((\\+91-?)|0)?[0-9]{6}$"),
    ]),
    address: new FormControl(null, [Validators.required]),
    country: new FormControl(null, Validators.required),
    state: new FormControl(null, Validators.required),
    how_did_you_know_us: new FormControl(null, Validators.required),
    GST_Number: new FormControl(null),
  });
  update_now() {
    this.submitted = true;
    console.log(this.mydetails.valid);
    if (this.mydetails.valid) {
      this.api.update_profile(this.mydetails.value).subscribe((res: any) => {
        // this.authcheck.get_userDetails()
        this.authcheck.userDetails.next(res);
        this.submitted = false;
        // this.router.navigateByUrl("dashboard/myprofile")
        window.history.back();
      });
    }
  }
  change_category(e: any) {
    let post: any = [];
    if (this.mydetails.get("category")?.value != null) {
      post = this.mydetails.get("category")?.value;
    }
    let index = post.findIndex((a: any) => a == e.target.value);
    if (index != -1) {
      post.splice(index, 1);
    } else {
      post.push(e.target.value);
    }
    this.mydetails.get("category")?.setValue(post);
    console.log(this.mydetails.get("category")?.value);
  }

  show_selected_post(item: any) {
    console.log("show_selected_post", item);
    let postIndex = this.category.findIndex((a: any) => a == item);
    console.log(postIndex);
    if (postIndex != -1) {
      return item;
    } else {
      return "sdajks";
    }
  }

  
  Allcountry: any = [];
  isoCountry: any;
  getCountry() {
    this.api.get_country().subscribe((res: any) => {
      console.log(res);
      this.Allcountry = res;
    });
  }

  Allstate: any = [];
  Allcity: any = [];
  findState(v: any) {
    let country = this.Allcountry[v.target.value];
    // console.log(country)
    this.mydetails.patchValue({
      country: country.name,
    });
    this.isoCountry = country.isoCode;
    this.api.get_state(country.isoCode).subscribe((res: any) => {
      console.log(res);
      this.Allstate = res;
    });
  }

  findCity(v: any) {
    let state = this.Allstate[v.target.value];
    this.mydetails.patchValue({
      state: state.name,
    });
    this.api.get_city(this.isoCountry, state.isoCode).subscribe((res: any) => {
      console.log(res);
      this.Allcity = res;
    });
  }

}
