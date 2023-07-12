import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Env } from './environment';

@Injectable({
  providedIn: 'root'
})
export class AuthcheckService {
  baseURL = Env.baseAPi;

  constructor(public http: HttpClient) { }

  userDetails = new BehaviorSubject<any>(false);
  loading: any = false;
  get_userDetails() {
    if (!this.loading) {
      this.http.get(this.baseURL + "/v1/seller/mydetails/profile").subscribe((res: any) => {
        this.userDetails.next(res)
        this.loading = true;
      })
    }
  }
  loaderShow = new BehaviorSubject<any>(false)
  change_header(type: any) {
    console.log(type,2321312)
    this.loaderShow.next(type)
  }
}
