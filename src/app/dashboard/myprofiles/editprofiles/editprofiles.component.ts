import { Router } from "@angular/router";
import { AuthcheckService } from "src/app/authcheck.service";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
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
    private router: Router,
    private formBuilder: FormBuilder
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
    this.getCountry();
    this.authcheck.userDetails.subscribe((res: any) => {
      this.mydetails = this.formBuilder.group({
        tradeName: new FormControl(res.tradeName, [Validators.required]),
        email: new FormControl(res.email, [
          Validators.required,
          Validators.email,
        ]),
        companyName: new FormControl(res.companyName, Validators.required),
        Designation: new FormControl(res.Designation, Validators.required),
        webSite: new FormControl(res.webSite),
        category: this.formBuilder.array(
          this.category.map((x) => res.category.indexOf(x) > -1)
        ),
        mobileNumber: new FormControl(res.mobileNumber, [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),
          Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),
        ]),
        Pincode: new FormControl(res.Pincode, [
          Validators.required,
          Validators.maxLength(6),
          Validators.minLength(6),
          Validators.pattern("^((\\+91-?)|0)?[0-9]{6}$"),
        ]),
        address: new FormControl(res.address, [Validators.required]),
        how_did_you_know_us: new FormControl(
          res.how_did_you_know_us,
          Validators.required
        ),
        GST_Number: new FormControl(res.GST_Number),
      });
      console.log(
        this.category.map((x) => res.category.indexOf(x) > -1),
        9876897654
      );
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
  mydetails: any;
  update_now() {
    this.submitted = true;
    console.log(this.mydetails.valid);
    const valueToStore = Object.assign({}, this.mydetails.value, {
      category: this.convertToValue('category', this.category),

    });
    console.log(valueToStore)
    console.log(this.mydetails.value)
    if (this.mydetails.valid) {
      this.api.update_profile(valueToStore).subscribe((res: any) => {
        // this.authcheck.get_userDetails()
        this.authcheck.userDetails.next(res);
        this.submitted = false;
        // this.router.navigateByUrl("dashboard/myprofile")
        window.history.back();
      });
    }
  }
  get get_category() {
    return this.mydetails.value["category"]
      .map((x: any, i: any) => x && this.category[i])
      .filter((x: any) => !!x);
  }
  convertToValue(key: string, value: any) {
    return this.mydetails.value[key]
      .map((x: any, i: any) => x && value[i])
      .filter((x: any) => !!x);
  }
  show_selected_post(item: any) {
    console.log("show_selected_post", item);
    let postIndex = this.category.findIndex((a: any) => a == item);
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
