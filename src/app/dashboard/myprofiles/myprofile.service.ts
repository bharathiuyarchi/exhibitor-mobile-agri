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
}
