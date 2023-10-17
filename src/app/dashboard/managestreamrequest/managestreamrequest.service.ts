import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Env } from 'src/app/environment';

@Injectable({
  providedIn: 'root'
})
export class ManagestreamrequestService {
  baseurl = Env.baseAPi;

  constructor(private http: HttpClient) { }
  get_purchasePlans() {
    return this.http.get(
      this.baseurl + "/v1/purchaseplan/mypurchase/plans/gellall"
    );
  }

  get_one_request(id: any) {
    return this.http.get(this.baseurl + "/v1/ecomplan/get/one/stream?id=" + id);
  }
  create_request_one(date: any) {
    return this.http.post(this.baseurl + "/v1/ecomplan/create/stream/one", date);
  }
  create_request_one_image(date: any, id: any) {
    return this.http.post(
      this.baseurl + "/v1/ecomplan/create/stream/one/image?id=" + id,
      date
    );
  }
  create_request_one_broucher(date: any, id: any) {
    return this.http.post(this.baseurl + "/v1/ecomplan/create/stream/one/broucher?id=" + id, date);
  }

  create_request_one_video(date: any, id: any) {
    return this.http.post(
      this.baseurl + "/v1/ecomplan/create/stream/one/video?id=" + id,
      date
    );
  }
  update_request_one(date: any, id: any) {
    return this.http.put(this.baseurl + "/v1/ecomplan/create/stream/one?id=" + id, date);
  }

  get_all_post() {
    return this.http.get(this.baseurl + "/v1/ecomplan/get/all/post");
  }
  get_all_post_trasation(id: any) {
    return this.http.get(this.baseurl + "/v1/ecomplan/get/all/post/transation?id=" + id);
  }

  get_all_request(page: any) {
    return this.http.get(
      this.baseurl + "/v1/ecomplan/get/all/stream?page=" + page
    );
  }

  cancel_stream(id: any) {
    return this.http.put(this.baseurl + "/v1/ecomplan/cancel/stream", {
      id: id,
    });
  }
  Booked_slots_Byusers(id: any) {
    return this.http.get(
      this.baseurl + "/v1/slotbooking/Booked/slots/Byusers/" + id
    );
  }
  get_Planes() {
    return this.http.get(
      this.baseurl + "/v1/purchaseplan/getPlanes/Request/Streams"
    );
  }
  remove_files(type: any, id: any) {
    return this.http.put(this.baseurl + `/v1/ecomplan/remove/${type}/${id}`,{});
  }
}
