import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Env } from 'src/app/environment';

@Injectable({
  providedIn: 'root'
})
export class ManagelivestreamService {

  baseurl = Env.baseAPi;

  constructor(private http: HttpClient) { }

  get_all_plans(page: any) {
    return this.http.get(this.baseurl + "/v1/ecomplan/my/approved/streams?page=" + page);
  }

  get_token_details(id: any) {
    return this.http.get(this.baseurl + "/v1/ecomplan/golive/host/view?id=" + id);
  }
  create_token(data: any) {
    return this.http.post(this.baseurl + "/v2/generateRTC/production/livestream/generateToken/supplier", data);
    // return this.http.post("http://localhost:3000/v2/generateRTC/getToken" ,data, { headers: { auth: this.token }, });
    // return this.http.post(this.baseurl + "/v2/generateRTC/getToken", data, { headers: { auth: this.token }, });

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
}
