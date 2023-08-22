import { Component, OnInit } from "@angular/core";
import { ManageplaneService } from "../../manageplan/manageplane.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-stream-orders",
  templateUrl: "./stream-orders.component.html",
  styleUrls: ["./stream-orders.component.css"],
})
export class StreamOrdersComponent implements OnInit {
  stream: any;
  id: any;
  orders: any;
  notFound: any = false;

  constructor(
    private Api: ManageplaneService,
    private Aroute: ActivatedRoute,
    private router: Router
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
      console.log(e);
      this.orders = e;
      if (e.length < 1) {
        this.notFound = true;
      }
    });
  }

  orderViewRoute(id: any) {
    console.log(id);
    this.router.navigateByUrl("dashboard/manag-orders/orderView/" + id);
  }
}
// dashboard/manag-orders/orderView/68b6312b-aa80-485c-a7c9-4174a27f6632
