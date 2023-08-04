import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Env } from "src/app/environment";
import { ManagestreamrequestService } from "../managestreamrequest.service";

@Component({
  selector: "app-managerequest",
  templateUrl: "./managerequest.component.html",
  styleUrls: ["./managerequest.component.css"],
})
export class ManagerequestComponent implements OnInit {
  constructor(public api: ManagestreamrequestService, public router: Router) {}
  page = 0;
  displaycount = 0;
  totalcount: any = 0;
  pagetotal: any = 0;
  iso: any;
  next: any = false;
  ngOnInit(): void {
    this.iso = new Date().getTime();
    this.get_my_request(this.page);
    this.get_posts();
  }
  myrequest: any;
  baseURL: any = Env.baseAPi;
  get_my_request(page: any) {
    this.api.get_all_request(page).subscribe((res: any) => {
      console.log(res);
      this.myrequest = res.value;
      this.next = res.next;
    });
  }
  post_list: any;
  plan_list: any;
  get_posts() {
    this.api.get_all_post().subscribe((res: any) => {
      console.log(res);
      this.post_list = res;
    });
    this.api.get_purchasePlans().subscribe((res: any) => {
      console.log(res);
      this.plan_list = res;
    });
  }
  cancel_stream(item: any) {
    this.api.cancel_stream(item._id).subscribe((res: any) => {
      console.log(res);
      this.get_my_request(this.page);
    });
  }

  go_to_new_stream() {
    // if (this.plan_list.length == 0) {
    //   this.popupType = 'by_plan';
    // }
    // else if (this.post_list.length == 0) {
    //   this.popupType = 'create_post';
    // }
    // else {
    //   this.router.navigateByUrl('/dashboard/stream/add')
    // }
    this.router.navigateByUrl("/dashboard/stream/add");
  }

  view_details: any;
  view_details_type: any;
  view_request(type: any, item: any) {
    console.log("sdfs");
    this.view_details = item;
    this.view_details_type = type;
    // $('#view_details').modal('show');
  }
  close_popup() {
    this.view_details = null;
    this.view_details_type = null;
  }
  change_view(type: any) {
    this.view_details_type = type;
  }

  pagination(type: any) {
    console.log(type);
    if (type == "prev") {
      this.page--;
    }
    if (type == "next") {
      this.page++;
    }
    this.get_my_request(this.page);
  }
  view_details_type_action(type: any) {
    this.view_details_type = type;
  }

  popupType: any = "";

  close_popup_now() {
    this.popupType = "";
  }
}
