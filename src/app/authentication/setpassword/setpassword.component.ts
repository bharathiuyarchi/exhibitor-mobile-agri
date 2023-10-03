import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Component } from "@angular/core";
import { AuthenticationService } from "../authentication.service";
import { Router } from "@angular/router";
import { iif } from "rxjs";

@Component({
  selector: "app-setpassword",
  templateUrl: "./setpassword.component.html",
  styleUrls: ["./setpassword.component.css"],
})
export class SetpasswordComponent {
  constructor(public api: AuthenticationService, private router: Router) {}
  submitted: any = false;
  errorMessage: any;
  sameOne: boolean = false;
  show1: boolean = false;
  show2: boolean = false;

  change1() {
    this.show1 = !this.show1;
  }
  change2() {
    this.show2 = !this.show2;
  }

  set_password() {
    if (
      this.setpassword.get("password")?.value !=
      this.setpassword.get("conformPassword")?.value
    ) {
      console.log("asjkdhfgjshdfgsdjhfg")
      this.sameOne = true;
      
    }else{
      if (this.setpassword.valid && this.sameOne) {
        this.submitted = false;
        this.sameOne = false;
        this.api.setPassword(this.setpassword.value).subscribe(
          (res: any) => {
            console.log(res);
            localStorage.removeItem("verifiedAccount");
            this.router.navigate(["login"]);
          },
          (error) => {
            this.errorMessage = error;
          }
        );
      }
    }

    this.submitted = true;
    this.errorMessage = null;

  
  }

  setpassword: any = new FormGroup({
    password: new FormControl(null, [Validators.required]),
    conformPassword: new FormControl(null, [Validators.required]),
  });
}
