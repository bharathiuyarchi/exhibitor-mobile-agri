import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../authentication.service";

@Component({
  selector: "app-verifyotp",
  templateUrl: "./verifyotp.component.html",
  styleUrls: ["./verifyotp.component.css"],
})
export class VerifyotpComponent implements OnInit {
  constructor(private api: AuthenticationService, private router: Router) {}
  ngOnInit(): void {
    this.number = localStorage.getItem("mobileNumber");
    this.startTimer();
  }

  submitted: any = false;
  errorMessage: any;
  number: any;
  recentShow: any = false;
  remainingTime: number = 60;
  private intervalId: any;
  verify_otp() {
    this.submitted = true;
    this.errorMessage = null;
    this.verifyOTP.patchValue({
      mobileNumber: localStorage.getItem("mobileNumber"),
    });
    if (this.verifyOTP.valid) {
      this.submitted = false;
      this.api.verifyOTP(this.verifyOTP.value).subscribe(
        (res: any) => {
          console.log(res);
          localStorage.removeItem("mobileNumber");
          localStorage.setItem("verifiedAccount", res.access.token);
          this.router.navigate(["setpassword"], { replaceUrl: true });
        },
        (error) => {
          this.errorMessage = error.error.message;

          console.log(this.errorMessage);
        }
      );
    }
  }
  resend() {
    let data = {
      mobileNumber: this.number,
    };
    this.api.forgetPassword(data).subscribe((res: any) => {});
  }
  verifyOTP: any = new FormGroup({
    mobileNumber: new FormControl(null, [Validators.required]),
    otp: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(6),
    ]),
  });
  startTimer() {
    this.intervalId = setInterval(() => {
      this.remainingTime--;
      if (this.remainingTime === 0) {
        this.clearTimer();
        // Timer expired, perform necessary actions

        this.recentShow = true;
      }
    }, 1000); // Update every second (1000 milliseconds)
  }

  clearTimer() {
    clearInterval(this.intervalId);
  }

  resendOTP() {
    // let data = { mobileNumber: localStorage.getItem("mobileNumber") };
    // this.api.forgetPassword(data).subscribe((e: any) => {
    //   this.verifyOTP.reset();
    //   this.recentShow = false;
    //   this.remainingTime = 60;
    //   this.errorMessage = null;
    //   this.startTimer();
    // });

    let data = { mobileNumber: localStorage.getItem("mobileNumber") };
    let cont = localStorage.getItem("continue");
    if (cont == "true") {
      this.api.continueRegister(data).subscribe((e: any) => {
        this.verifyOTP.reset();
        this.recentShow = false;
        this.errorMessage = "";
        this.remainingTime = 60;
        this.startTimer();
      });
    } else {
      this.api.forgetPassword(data).subscribe((e: any) => {
        this.verifyOTP.reset();
        this.recentShow = false;
        this.remainingTime = 60;
        this.startTimer();
        this.errorMessage = "";
      });
    }

    // http://localhost:3000/v1/seller/forgot/seller
  }
}
