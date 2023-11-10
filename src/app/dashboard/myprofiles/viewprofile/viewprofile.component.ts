import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { AuthcheckService } from "src/app/authcheck.service";
import { AuthService } from "src/app/authguard.service";
import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "src/app/authentication/authentication.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-viewprofile",
  templateUrl: "./viewprofile.component.html",
  styleUrls: ["./viewprofile.component.css"],
})
export class ViewprofileComponent implements OnInit {
  userDetails: any;
  store: any = [];
  ngOnInit(): void {
    this.authcheck.get_userDetails();
    this.authcheck.userDetails.subscribe((res: any) => {
      console.log(res, 123123);
      this.userDetails = res;
    });
  }
  language: any;
  constructor(
    private auth: AuthService,
    private authcheck: AuthcheckService,
    private http: HttpClient,
    private authService: AuthenticationService,
    private translate: TranslateService
  ) {
    let lang: any = localStorage.getItem('language');
    lang == null ? 'en' : lang
    this.language = lang;
  }
  change_lang(language: any) {
    this.translate.use(language);
    localStorage.setItem('language', language)
    this.language = language;
  }
  logout() {
    this.auth.logout();
  }
  showEnqSubmit = false;

  show = 1;
  changeShow(v: number) {
    this.show = v;
    this.showEnqSubmit = false;
  }

  popup1: any = false;
  popupCLose1() {
    this.popup1 = false;
  }

  openPopup1() {
    this.popup1 = true;
  }

  showOtp = false;
  remainingTime: number = 60;
  private intervalId: any;
  recentShow: any = false;
  startTimer() {
    this.intervalId = setInterval(() => {
      this.remainingTime--;
      if (this.remainingTime === 0) {
        this.clearTimer();
        this.recentShow = true;
      }
    }, 1000);
  }

  clearTimer() {
    clearInterval(this.intervalId);
  }

  sendOTP() {
    this.authService
      .forgetPassword({
        mobileNumber: this.userDetails.mobileNumber.toString(),
      })
      .subscribe((e: any) => {
        this.popup1 = false;
        this.popup2 = true
        this.startTimer()
      });
  }

  popup2: any = false;
  popupCLose2() {
    this.popup2 = false;
  }
  otpform = new FormGroup({
    otp: new FormControl("", Validators.required),
  });

  resendOTP() {
    this.authService
      .forgetPassword({
        mobileNumber: this.userDetails.mobileNumber.toString(),
      })
      .subscribe((e: any) => {
        this.recentShow = false;
        this.remainingTime = 60;
        this.startTimer();
      });
  }
  otpSubmit() {
    if (this.otpform?.valid) {
      this.authService
        .deleteMyAccount({
          mobileNumber: this.userDetails.mobileNumber,
          otp: this.otpform.get("otp")?.value,
        })
        .subscribe((e: any) => {
          this.logout();
        });
    }
  }
}
