import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WindowRefServiceModule } from 'src/app/window-ref-service/window-ref-service.module';
import { ManageplaneService } from '../manageplane.service';

@Component({
  selector: 'app-manageplan',
  templateUrl: './manageplan.component.html',
  styleUrls: ['./manageplan.component.css']
})
export class ManageplanComponent implements OnInit {
  constructor(public route: ActivatedRoute, public api: ManageplaneService, public router: Router) { }
  page = 0;
  displaycount = 0;
  totalcount: any = 0;
  pagetotal: any = 0;
  date_now: any;

  ngOnInit(): void {
    this.date_now = new Date().getTime()
    console.log(this.date_now);
    this.get_myplans(this.page);
  }
  my_plans: any;
  view_details: any;
  next: any = false;
  get_myplans(page: any) {
    this.api.get_all_my_orders(page).subscribe((res: any) => {
      console.log(res)
      this.my_plans = res.plan;
      this.next = res.next;

    })
  }
  view_image(item: any) {
    this.view_details = item;
    // $("#view_details").modal('show');
  }

  pagination(type: any) {

    console.log(type)
    if (type == 'prev') {
      this.page--;
    }
    if (type == 'next') {
      this.page++;
    }
    this.get_myplans(this.page);
  }
}
