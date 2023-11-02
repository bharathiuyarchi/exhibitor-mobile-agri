import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ManagelivestreamService } from '../managelivestream/managelivestream.service';

@Component({
  selector: 'app-demostream',
  templateUrl: './demostream.component.html',
  styleUrls: ['./demostream.component.css']
})
export class DemostreamComponent implements OnInit {

  ngOnInit(): void {
    this.get_demo_request()
  }
  constructor(private api: ManagelivestreamService) {

  }

  stream_list: any;
  stream_list_count: any = 0;
  get_demo_request() {
    this.api.get_demo_request().subscribe((res: any) => {
      console.log(res)
      this.stream_list = res;
      this.stream_list_count = res != null ? res.length : 0;
    })
  }
  open_popup: any = false;
  close_popup_now() {
    this.open_popup = false;
  }

  transaction = new FormControl(null, Validators.required);
  submit() {
    this.submitetd = true;
    if (this.transaction.valid) {
      this.api.demo_Request(this.transaction.value).subscribe((res: any) => {
        console.log(res)
        this.get_demo_request();
        this.open_popup = false;
        this.transaction.reset();
        this.submitetd = false;
      })
    }
  }
  submitetd: any = false;
}
