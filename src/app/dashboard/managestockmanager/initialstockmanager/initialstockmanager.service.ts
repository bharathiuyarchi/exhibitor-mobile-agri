import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Env } from 'src/app/environment';

@Injectable({
  providedIn: 'root'
})
export class InitialstockmanagerService {

  baseurl = Env.baseAPi;

  constructor(private http: HttpClient) { }
  fetchStreamingDetails(page: any) {
    return this.http.get(this.baseurl + `/v1/ecomplan/getStock_Manager/${page}`)
  }
  fetchData(id: any) {
    console.log(id)
    return this.http.get(this.baseurl + `/v1/ecomplan/fetchStream/details/` + id);
  }
  getPendingProducts(id: any, page: any, filters: any) {
    const { status, name } = filters;
    return this.http.get(this.baseurl + `/v1/ecomplan/fetch/streaming/Details/Approval/?page=${page}&status=${status}&buyer=${name}&post=${id}`);
  }
  update(id: any, status: any) {
    return this.http.put(this.baseurl + `/v1/ecomplan/update/productOrders/${id}`, { status: status, });
  }
  MultipleUpdate(val: any, status: any) {
    return this.http.post(this.baseurl + `/v1/ecomplan/update/Multiple/productOrders`, { arr: val, status: status });
  }

}
