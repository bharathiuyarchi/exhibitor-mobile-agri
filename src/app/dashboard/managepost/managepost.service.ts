import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Env } from 'src/app/environment';

@Injectable({
  providedIn: 'root'
})
export class ManagepostService {

  baseurl = Env.baseAPi;

  constructor(private http: HttpClient) { }
  get_all_plans(params: any) {
    const queryString = new URLSearchParams(params).toString();
    return this.http.get(this.baseurl + "/v1/ecomplan/get/all/plan?id=" + queryString);
  }

  get_categorys() {
    return this.http.get(this.baseurl + "/v1/category");

  }
  get_product_by_cat(id: any) {
    return this.http.get(this.baseurl + "/v1/product/get/product/by/category/" + id);

  }

  get_one_post(id: any) {
    return this.http.get(this.baseurl + "/v1/ecomplan/get/one/post?id=" + id);
  }
  create_post(date: any) {
    return this.http.post(this.baseurl + "/v1/ecomplan/create/post", date);
  }
  create_post_teaser(date: any, id: any) {
    return this.http.post(this.baseurl + "/v1/ecomplan/create/post/teaser?id=" + id, date);
  }
  update_one_post(id: any, data: any) {
    return this.http.put(this.baseurl + "/v1/ecomplan/update/one/post?id=" + id, data);
  }
  get_all_post(params: any) {
    const queryString = new URLSearchParams(params).toString();

    return this.http.get(this.baseurl + "/v1/ecomplan/get/all/post/pagenation?" + queryString);
  }

  delete_one_post(id: any) {
    return this.http.delete(this.baseurl + "/v1/ecomplan/delete/one/post?id=" + id);
  }

  removed_one_post(id: any) {
    return this.http.put(this.baseurl + "/v1/ecomplan/remove/one/post?id=" + id, {});
  }
  customerRequestProduct(data: any) {
    return this.http.post(
      this.baseurl + "/v1/product/createCustomer/Request/Product",
      data
    );
  }
  get_old_post(id: any) {
    return this.http.get(this.baseurl + "/v1/ecomplan/get/previus/post?id=" + id);
  }

  getAddress(lat: any, long: any) {
    const data = {
      lat: lat,
      long: long,
    };
    const queryString = new URLSearchParams(data).toString();
    return this.http.get(this.baseurl + '/v1/ecomplan/get/address/lat/log?' + queryString);
  }
}
