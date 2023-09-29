import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Env } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  baseURL = Env.baseAPi;
  constructor(private http: HttpClient) { }

  register_seller(data: any) {
    return this.http.post(this.baseURL + '/v1/seller/register/seller', data);
  }
  verifyOTP(data: any) {
    return this.http.post(this.baseURL + '/v1/seller/verifyotp/seller', data);


  }
  setPassword(data: any) {
    let header: any = { headers: { verifiedAccount: localStorage.getItem('verifiedAccount') } }
    return this.http.post(this.baseURL + '/v1/seller/setpassword/seller', data, header);
  }
  login(data: any) {
    return this.http.post(this.baseURL + '/v1/seller/login/seller', data);

  }
  forgetPassword(data: any) {
    return this.http.post(this.baseURL + '/v1/seller/forgot/seller', data);
  }

  alreadyUser(data: any) {
    return this.http.post(this.baseURL + '/v1/seller/alreadyuser/seller', data);
  }
  continueRegister(data:any){
    return this.http.post(this.baseURL+'/v1/seller/sendOTP/continue',data)
  }
  get_country(){
    return this.http.get(this.baseURL+'/v2/agora/get/country')
  }
  get_state(country:any){
    return this.http.get(this.baseURL+`/v2/agora/get/state?county=${country}`)
  }
  get_city(country:any,state:any){
    return this.http.get(this.baseURL+`/v2/agora/get/city?county=${country}&state=${state}`)
  }
}
