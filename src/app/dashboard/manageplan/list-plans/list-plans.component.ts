import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ManageplaneService } from "../manageplane.service";

@Component({
  selector: "app-list-plans",
  templateUrl: "./list-plans.component.html",
  styleUrls: ["./list-plans.component.css"],
})
export class ListPlansComponent implements OnInit {
  @Input("view") view: any = false;
  @Input("selected") selected: any = false;

  constructor(
    public api: ManageplaneService,
    public router: ActivatedRoute,
    private route: Router
  ) {}
  id: any;
  stream: any;
  popup: any = false;
  popup1: any = false;
  ngOnInit(): void {
    this.getlikePlan();
    this.get_plans_purchase();
    console.log(this.selected);
    // this.router.queryParams.subscribe((params: any) => {
    //   console.log(params, 12312)
    //   this.id = params.id;
    //   this.stream = params.stream;
    //   if (this.id == null) {
    //     this.id = this.stream;
    //   }
    //   if (params.page != null) {
    //     this.page = params.page;
    //   }
    // })
    // this.get_all_plans(this.page);
  }
  allPlans: any[] = [];
  page: any = 0;
  plans: any;
  next: any = false;
  get_all_plans(page: any) {
    if (this.id == null && this.stream == null) {
      this.api.get_all_plans(page).subscribe((res: any) => {
        console.log(res);
        this.plans = res.value;
        this.next = res.next;
      });
    } else {
      this.api.get_all_plans_addon(page).subscribe((res: any) => {
        console.log(res);
        this.plans = res.value;
        this.next = res.next;
      });
    }
  }
  viewPlans: any = [];
  view_plan(item: any) {
    this.viewPlans = item;
    this.popup = true;
    console.log(item, this.viewPlans);
  }
  planid: any;
  getlikePlan() {
    this.api.get_buy_plan().subscribe((res: any) => {
      console.log(res);
      this.planid = res[0]._id;
      console.log(this.planid, "plan id");
    });
  }

  buyplan() {
    delete this.viewPlans._id;
    this.api.buy_plan(this.viewPlans).subscribe((res: any) => {
      console.log(res);
      this.getlikePlan();
      this.route.navigateByUrl("/dashboard/plan");
    });
  }
  get_plans_purchase() {
    this.api.get_buy_plansM(this.page).subscribe((res: any) => {
      console.log(res, "all plans");
      this.allPlans = res.value;
    });
  }
  liveStream(data: any) {
    let result = data.reduce(
      (
        accumulator: any,
        currentValue: { slotType: string; Duration: number; No_Of_Slot: number }
      ) => {
        return accumulator + currentValue.No_Of_Slot;
      },
      0
    );
    return result;
  }
  totalmin(data: any) {
    let result = data.reduce(
      (
        accumulator: any,
        currentValue: { slotType: string; Duration: number; No_Of_Slot: number }
      ) => {
        return accumulator + currentValue.Duration * currentValue.No_Of_Slot;
      },
      0
    );
    return result;
  }

  pagination(type: any) {
    console.log(type);
    if (type == "prev") {
      this.page--;
    }
    if (type == "next") {
      this.page++;
    }
    this.get_all_plans(this.page);
  }
  popupCLose() {
    this.popup = false;
  }
  popupCLose1() {
    this.popup1 = false;
  }

  popup1Open() {
    this.popup1 = true;
  }
}

@Component({
  selector: "app-list-plans-show",
  templateUrl: "list-plans.component-view.html",
  styleUrls: ["./list-plans.component.css"],
})
export class ListPlansComponentShow {
  @Input("view") view: any = false;
}
