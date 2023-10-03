import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/authguard.service";
import { AuthenticationService } from "../authentication.service";
import { NumberOnlyService } from "src/app/number-only.service";

@Component({
  selector: "app-registercomponent",
  templateUrl: "./registercomponent.component.html",
  styleUrls: ["./registercomponent.component.css"],
})
export class RegistercomponentComponent implements OnInit {
  constructor(
    public auth: AuthService,
    public api: AuthenticationService,
    private router: Router,
    private number: NumberOnlyService
  ) {}
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
    this.auth.isAuth.next("login");
    this.getCountry();
  }
  submitted: any = false;
  terms: any = false;
  errorMessage: any;
  changecheck(event: any) {
    console.log(event.target.value);
    if (event.target.value == "Yes") {
      this.terms = true;
    } else {
      this.terms = false;
    }
  }
  termErr: any = false;
  login_now() {
    this.submitted = true;
    this.errorMessage = null;
    console.log(this.registerForm.value);
    if (!this.terms) {
      this.termErr = true;
    }

    if (this.registerForm.valid && this.terms) {
      this.submitted = false;
      this.termErr = false;
      this.api.register_seller(this.registerForm.value).subscribe(
        (res: any) => {
          console.log(res);
          localStorage.setItem("mobileNumber", res.mobileNumber);
          this.router.navigate(["verifyotp"]);
        },
        (error) => {
          console.log(error);
          this.errorMessage = error.error.message;
        }
      );
    }
  }
  registerForm = new FormGroup({
    tradeName: new FormControl(null, Validators.required),
    companyName: new FormControl(null, Validators.required),
    Designation: new FormControl(null),
    webSite: new FormControl(null),
    category: new FormControl([], Validators.required),
    how_did_you_know_us: new FormControl(null, Validators.required),
    mobileNumber: new FormControl(null, [
      Validators.required,
      Validators.maxLength(10),
      Validators.minLength(10),
      Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),
    ]),
    email: new FormControl(
      "",
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    ),
    address: new FormControl(null, [Validators.required]),
    country: new FormControl(null, [Validators.required]),
    state: new FormControl(null, [Validators.required]),
    city: new FormControl(null, [Validators.required]),
    Pincode: new FormControl(null, [
      Validators.required,
      Validators.maxLength(6),
      Validators.minLength(6),
      Validators.pattern("^((\\+91-?)|0)?[0-9]{6}$"),
    ]),
    GST_Number: new FormControl(),
  });
  get loginerror(): any {
    return this.registerForm.controls;
  }
  only_ten_degist(event: any, num: any) {
    return this.number.number_service(event, num);
  }
  change_category(e: any) {
    let post: any = [];
    if (this.registerForm.get("category")?.value != null) {
      post = this.registerForm.get("category")?.value;
    }
    let index = post.findIndex((a: any) => a == e.target.value);
    if (index != -1) {
      post.splice(index, 1);
    } else {
      post.push(e.target.value);
    }

    this.registerForm.get("category")?.setValue(post);
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
    this.registerForm.patchValue({
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
    this.registerForm.patchValue({
      state: state.name,
    });
    this.api.get_city(this.isoCountry, state.isoCode).subscribe((res: any) => {
      console.log(res);
      this.Allcity = res;
    });
  }
}
