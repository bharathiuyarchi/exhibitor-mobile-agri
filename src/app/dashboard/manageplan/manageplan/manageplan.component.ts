import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { WindowRefServiceModule } from "src/app/window-ref-service/window-ref-service.module";
import { ManageplaneService } from "../manageplane.service";

@Component({
  selector: "app-manageplan",
  templateUrl: "./manageplan.component.html",
  styleUrls: ["./manageplan.component.css"],
})
export class ManageplanComponent implements OnInit {
  constructor(
    public route: ActivatedRoute,
    public api: ManageplaneService,
    public router: Router
  ) {}
  page = 0;
  displaycount = 0;
  totalcount: any = 0;
  pagetotal: any = 0;
  date_now: any;

  ngOnInit(): void {
    this.date_now = new Date().getTime();
    console.log(this.date_now);
    this.get_myplans();
  }
  my_plans: any;
  view_details: any;
  next: any = false;
  get_myplans() {
    // this.api.get_all_my_orders(page).subscribe((res: any) => {
    //   console.log(res);
    //   this.my_plans = res.plan;
    //   this.next = res.next;
    // });
    this.api.getPlanesByUser().subscribe((res: any) => {
      this.my_plans = res;
      console.log(this.my_plans, "planes");
    });
  }
  view_image(item: any) {
    this.view_details = item;
    // $("#view_details").modal('show');
  }

  pagination(type: any) {
    console.log(type);
    if (type == "prev") {
      this.page--;
    }
    if (type == "next") {
      this.page++;
    }
  }

  popup1: any = false;
  popupCLose1() {
    this.popup1 = false;
  }

  popup1Open() {
    this.popup1 = true;
  }
  viewPlans: any;
  planClick(i: any) {
    let id = this.my_plans[i]._id;
    this.api.getPlanById(id).subscribe((e: any) => {
      this.viewPlans = e;
      this.popup1 = true;
    });
  }
}
