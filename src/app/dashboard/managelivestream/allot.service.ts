
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Env } from 'src/app/environment';


@Injectable({
  providedIn: 'root'
})
export class MamaneAllot {

  baseurl = Env.baseAPi;

  constructor(private http: HttpClient) { }
  get_stream() {
    return this.http.get(this.baseurl + "/v1/ecomplan/get/stream/all/alert");
  }
  get_stream_one(id: any) {
    return this.http.get(this.baseurl + "/v1/ecomplan/get/one/stream/assign/host?id=" + id);
  }

  get_sub_host(id: any) {
    return this.http.get(this.baseurl + "/v1/seller/get/subhost/free?id=" + id);
  }
  alert_stream(body: any, id: any) {
    return this.http.put(this.baseurl + "/v1/ecomplan/allot/stream/subhost?id=" + id, body);
  }
}



