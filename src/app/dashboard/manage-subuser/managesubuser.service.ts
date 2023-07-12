import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Env } from 'src/app/environment';

@Injectable({
  providedIn: 'root'
})
export class ManagesubuserService {

  baseURL = Env.baseAPi;
  constructor(private http: HttpClient) { }


  create_subuser(data: any) {
    return this.http.post(this.baseURL + "/v1/seller/create/subuser", data)
  }

  get_subuser_all(page: any) {
    return this.http.get(this.baseURL + "/v1/seller/getall/subuser?page=" + page)
  }
  disabled_user(id: any) {
    return this.http.put(this.baseURL + "/v1/seller/disabled/subuser?id=" + id, {})
  }
  get_single_user(id: any) {
    return this.http.get(this.baseURL + "/v1/seller/get/single/user?id=" + id, {})
  }
  update_single_user(id: any, body: any) {
    return this.http.put(this.baseURL + "/v1/seller/update/single/user?id=" + id, body)
  }
}
