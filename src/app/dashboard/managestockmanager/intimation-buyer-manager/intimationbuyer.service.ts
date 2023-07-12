import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Env } from 'src/app/environment';

@Injectable({
  providedIn: 'root'
})
export class IntimationbuyerService {

  constructor(private http: HttpClient) { }
  baseurl = Env.baseAPi;


  fetchStreamingDetails(page: any) {
    return this.http.get(this.baseurl + `/v1/ecomplan/getStock_Manager/${page}`)
  }
  fetchData(id: any, page: any, filter: any) {
    const { name, status } = filter;
    return this.http.get(this.baseurl + `/v1/ecomplan/fetch/Stream/Ordered/Details/${id}?page=${page}&buyer=${name}&status=${status}`);
  }
  confirmClick(id: any, msg: any) {
    return this.http.put(`${this.baseurl}/v1/ecomplan/update/Status/For/StreamingOrders/${id}`, { status: msg });
  }
}
