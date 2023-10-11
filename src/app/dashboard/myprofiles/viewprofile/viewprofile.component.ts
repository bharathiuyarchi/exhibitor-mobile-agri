import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { AuthcheckService } from "src/app/authcheck.service";
import { AuthService } from "src/app/authguard.service";
import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "src/app/authentication/authentication.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";

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
  constructor(
    private auth: AuthService,
    private authcheck: AuthcheckService,
    private http: HttpClient,
    private authService: AuthenticationService
  ) {}

  logout() {
    this.auth.logout();
  }
  showEnqSubmit = false;

<<<<<<< HEAD
  show=1;
  changeShow(v:number){
    this.show=v
    // this.showEnqSubmit=false
  }
  showDltAcc=false
  cDltAcc(){
    this.showDltAcc= !this.showDltAcc
  }
  sendOtp(){
    let data ={
      mobile:this.userDetails.mobile
    }
    // this.api.forgetPassword(data).subscribe((res:any)=>{

    // })
  }
  showAddDlt=false
  closeAddDlt()
  {
    // this.showAddDlt=!this.showAddDlt
  }
  showOtp=false
  remainingTime: number = 60;
  private intervalId: any;
  recentShow: any = false;
  showCOtp(){
    this.showOtp=true
    this.sendOtp()
    this.startTimer()
  }
  OpenOtp(){
    this.showOtp=!this.showOtp
  }
  backOtp(){
    this.showOtp=false
    this.showDltAcc=false
  }
=======
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
>>>>>>> 3f3d65da5b320d0cd186ee81a7d8aad0e8da95b5
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
<<<<<<< HEAD
  resendOTP() {
    
    // let data ={
    //   mobile:this.userDetails.mobile
    // }
    // this.api.forgetPassword(data).subscribe((e: any) => {
     
    //   this.recentShow = false;
    //   this.remainingTime = 60;
    //   this.startTimer();
    // });
    // http://localhost:3000/v1/seller/forgot/seller
  }
  DeOtp:any;
  DeSubmit=false
  errorMessage:any;
  submitOtp(){
    // this.DeSubmit=true
    // if(this.DeOtp){
    //   let data ={
    //     mobile:Number(this.userDetails.mobile),
    //     otp:Number(this.DeOtp)
    //   }
    //   console.log(data)
    //   this.DeSubmit=false
    //   this.api.verfiy_deactive_otp(data).subscribe((res:any)=>{
    //     console.log(res)
    //     this.logout()
    //   },(error) => {
    //     this.errorMessage = error.error.message;
    //   })
    // }
    
  
=======

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
>>>>>>> 3f3d65da5b320d0cd186ee81a7d8aad0e8da95b5
  }
}
