
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Env } from '../environment';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class Managelivestream_sub {

  local: any = localStorage.getItem('token');
  // token: any = JSON.parse(this.local).value;
  baseurl = Env.baseAPi;
  constructor(private http: HttpClient) { }

  get_all_plans(page: any, status: any) {
    return this.http.get(this.baseurl + "/v1/ecomplan/subhost/assign/streams?page=" + page + "&status=" + status);
  }

  get_token_details(id: any) {
    return this.http.get(this.baseurl + "/v1/ecomplan/golive/host/view/subhost?id=" + id);
  }
  create_token(data: any) {
    // return this.http.post("http://localhost:3000/v2/generateRTC/getToken" ,data, { headers: { auth: this.token }, });
    return this.http.post(this.baseurl + "/v2/generateRTC/create/subhost/token", data);
  }
  get_old_chats(channel: any) {
    return this.http.get(this.baseurl + "/v2/chat/getoldchats?channel=" + channel)
  }

  create_cloude_recording(data: any) {
    return this.http.post(this.baseurl + "/v2/generateRTC/production/livestream/generateToken/supplier/cloudrecording", data);
  }

  join_chat_now(id: any) {
    return this.http.get(this.baseurl + "/v1/ecomplan/only/chat/join?id=" + id)
  }

  start_raising(id: any) {
    return this.http.post(this.baseurl + "/v2/generateRTC/start/raicehands", { stream: id });
  }
  get_raise_datails(id: any) {
    return this.http.get(this.baseurl + "/v2/generateRTC/start/raicehands?stream=" + id);
  }
  raise_hands = new BehaviorSubject<any>(false);

  approve_raise(id: any) {
    return this.http.post(this.baseurl + "/v2/generateRTC/raise/appove", { raise: id });
  }
  reject_raise(id: any) {
    return this.http.post(this.baseurl + "/v2/generateRTC/raise/reject", { raise: id });
  }
  pending_raise(id: any) {
    return this.http.post(this.baseurl + "/v2/generateRTC/raise/pending", { raise: id });
  }

}



