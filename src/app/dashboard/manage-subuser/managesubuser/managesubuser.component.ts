import { Component, OnInit } from '@angular/core';
import { ManagesubuserService } from '../managesubuser.service';

@Component({
  selector: 'app-managesubuser',
  templateUrl: './managesubuser.component.html',
  styleUrls: ['./managesubuser.component.css']
})
export class ManagesubuserComponent implements OnInit {

  constructor(public api: ManagesubuserService) {

  }
  subUsert_List: any;
  ngOnInit(): void {
    this.get_subusers();

  }
  get_subusers() {
    this.api.get_subuser_all(this.page).subscribe((res: any) => {
      console.log(res)
      this.subUsert_List = res.values;
      this.next = res.next
    })
  }
  page: any = 0;
  next: any = false;
  pagination(type: any) {

    console.log(type)
    if (type == 'prev') {
      this.page--;
    }
    if (type == 'next') {
      this.page++;
    }
    this.get_subusers();
  }
  disabled_user(item: any) {
    this.api.disabled_user(item._id).subscribe((res: any) => {
        
    })
  }
}
