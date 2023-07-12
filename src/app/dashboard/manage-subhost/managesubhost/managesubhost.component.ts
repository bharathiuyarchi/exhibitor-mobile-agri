import { Component, OnInit } from '@angular/core';
import { ManagesubhostService } from '../managesubhost.service';

@Component({
  selector: 'app-managesubhost',
  templateUrl: './managesubhost.component.html',
  styleUrls: ['./managesubhost.component.css']
})
export class ManagesubhostComponent implements OnInit {

  constructor(public api: ManagesubhostService) {

  }
  subHost_List: any;
  ngOnInit(): void {
    this.get_subhost();
  }

  get_subhost() {
    this.api.get_subhost_all().subscribe((res: any) => {
      console.log(res)
      this.subHost_List = res.values;
      this.next = res.next
    })
  }
  page: any = 0
  next: any = false;
  pagination(type: any) {

    console.log(type)
    if (type == 'prev') {
      this.page--;
    }
    if (type == 'next') {
      this.page++;
    }
    this.get_subhost();
  }

  disabled_user(item: any) {
    this.api.disabled_user(item._id).subscribe((res: any) => {

    })
  }
}
