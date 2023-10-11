import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Env } from 'src/app/environment';

@Injectable({
  providedIn: 'root'
})
export class MyprofileService {

  baseURL: any = Env.baseAPi;
  constructor(private http: HttpClient) { }
  get_shop_types() {
    return this.http.get(this.baseURL + "/v1/product/shopList/all")
  }

  update_profile(data: any) {
    return this.http.put(this.baseURL + "/v1/seller/mydetails/profile", data)
  }
  chanagepassword(data: any) {
    return this.http.put(this.baseURL + "/v1/seller/mydetails/profile/changepassword", data)
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
