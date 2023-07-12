import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Env } from 'src/app/environment';

@Injectable({
  providedIn: 'root'
})
export class ManagesubhostService {

  baseURL = Env.baseAPi;
  constructor(private http: HttpClient) { }


  create_subhost(data: any) {
    return this.http.post(this.baseURL + "/v1/seller/create/subhost", data)
  }

  get_subhost_all() {
    return this.http.get(this.baseURL + "/v1/seller/getall/subhost")
  }
  disabled_user(id: any) {
    return this.http.put(this.baseURL + "/v1/seller/disabled/subhost?id=" + id, {})
  }
  get_single_user(id: any) {
    return this.http.get(this.baseURL + "/v1/seller/get/single/host?id=" + id, {})
  }
  update_single_user(id: any, body: any) {
    return this.http.put(this.baseURL + "/v1/seller/update/single/host?id=" + id, body)
  }

}
