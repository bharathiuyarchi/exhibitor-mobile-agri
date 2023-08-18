import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Env } from "src/app/environment";

@Injectable({
  providedIn: "root",
})
export class ManageplaneService {
  baseurl = Env.baseAPi;

  constructor(private http: HttpClient) {}
  get_buy_plansM(page: any) {
    return this.http.get(
      this.baseurl + `/v1/ecomplan/get/all/plan/pagination?page=${page}`
    );
  }
  get_all_plans(page: any) {
    return this.http.get(
      this.baseurl + "/v1/ecomplan/get/all/plan/normal?page=" + page
    );
  }
  get_all_plans_addon(page: any) {
    return this.http.get(
      this.baseurl + "/v1/ecomplan/get/all/plan/addon?page=" + page
    );
  }
  get_one_plans(id: any) {
    return this.http.get(this.baseurl + "/v1/ecomplan/get/one/plan?id=" + id);
  }

  razorpay_paynow(amount: any) {
    return this.http.post(
      this.baseurl + "/v1/paymentgatway/create/razorpay/orderid",
      { amount: amount }
    );
  }

  confirm_order_payment(data: any) {
    return this.http.post(
      this.baseurl + "/v1/purchaseplan/purchase/suceess",
      data
    );
  }
  confirm_order_payment_private(data: any) {
    return this.http.post(
      this.baseurl + "/v1/purchaseplan/purchase/suceess/private",
      data
    );
  }

  confirm_order_payment_addon(data: any) {
    // return this.http.post("http://localhost:3000/v1/purchaseplan/purchase/addon/suceess",data,{ headers: { auth: this.token },})
    return this.http.post(
      this.baseurl + "/v1/purchaseplan/purchase/addon/suceess",
      data
    );
  }
  buy_plan(data: any) {
    return this.http.post(
      this.baseurl + "/v1/purchaseplan/purchase/PurchasePlan/EXpo",
      data
    );
  }
  get_all_my_orders(page: any) {
    return this.http.get(
      this.baseurl +
        "/v1/purchaseplan/getpayment/details/all/normal?page=" +
        page
    );
  }
  get_buy_plan() {
    return this.http.get(
      this.baseurl + "/v1/purchaseplan/fetch/getPurchasedPlan"
    );
  }
  update_buy_plan(id: any, data: any) {
    return this.http.put(this.baseurl + "/v1/purchaseplan/" + id, data);
  }

  StreamDetails() {
    return this.http.get(
      this.baseurl + "/v1/ecomplan/get/stream/by/user?page=0"
    );
  }
  getStreamById(id: any) {
    return this.http.get(this.baseurl + "/v1/ecomplan/getStreambyId/" + id);
  }

  get_My_OrdersById(id: any) {
    return this.http.get(
      this.baseurl + "/v1/registerShop/get/Streaming/ordersByStream/" + id
    );
  }
  get_My_OrdersByOrder(id: any) {
    return this.http.get(
      this.baseurl + "/v1/registerShop/get/Streaming/ordersBy/Order/" + id
    );
  }
  // get/Streaming/ordersBy/Order
}
