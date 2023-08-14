import { Component, OnInit } from "@angular/core";
import { ManageplaneService } from "../../manageplan/manageplane.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-order-view",
  templateUrl: "./order-view.component.html",
  styleUrls: ["./order-view.component.css"],
})
export class OrderViewComponent implements OnInit {
  stream: any;
  id: any;
  orders: any;
  singleStreamOrders: any;
  baseURL: any = "https://agriexpo.click";
  constructor(
    private Api: ManageplaneService,
    private Aroute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.Aroute.params.subscribe((e: any) => {
      this.id = e.id;
      this.Api.getStreamById(e.id).subscribe((a: any) => {
        this.stream = a;
      });
    });
    this.fetchOrdes();
  }

  fetchOrdes() {
    this.Api.get_My_OrdersById(this.id).subscribe((e: any) => {
      this.orders = e[0].productTitle;
      this.singleStreamOrders = e[0];
    });
  }
}