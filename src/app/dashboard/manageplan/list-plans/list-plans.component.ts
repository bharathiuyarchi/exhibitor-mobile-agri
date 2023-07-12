import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ManageplaneService } from '../manageplane.service';

@Component({
  selector: 'app-list-plans',
  templateUrl: './list-plans.component.html',
  styleUrls: ['./list-plans.component.css']
})
export class ListPlansComponent implements OnInit {

  @Input('view') view: any = false;
  @Input('selected') selected: any = false;

  constructor(public api: ManageplaneService, public router: ActivatedRoute) { }
  id: any;
  stream: any;
  ngOnInit(): void {
    console.log(this.selected)
    this.router.queryParams.subscribe((params: any) => {
      console.log(params, 12312)
      this.id = params.id;
      this.stream = params.stream;
      if (this.id == null) {
        this.id = this.stream;
      }
      if (params.page != null) {
        this.page = params.page;
      }
    })
    this.get_all_plans(this.page);

  }

  page: any = 0;
  plans: any;
  next: any = false;
  get_all_plans(page: any) {
    if (this.id == null && this.stream == null) {
      this.api.get_all_plans(page).subscribe((res: any) => {
        console.log(res)
        this.plans = res.value;
        this.next = res.next;
      })
    }
    else {
      this.api.get_all_plans_addon(page).subscribe((res: any) => {
        console.log(res)
        this.plans = res.value;
        this.next = res.next;
      })
    }
  }

  pagination(type: any) {

    console.log(type)
    if (type == 'prev') {
      this.page--;
    }
    if (type == 'next') {
      this.page++;
    }
    this.get_all_plans(this.page);
  }
}

@Component({
  selector: 'app-list-plans-show',
  templateUrl: 'list-plans.component-view.html',
  styleUrls: ['./list-plans.component.css']
})
export class ListPlansComponentShow {

  @Input('view') view: any = false;


}

