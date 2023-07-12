import { Component, OnInit } from '@angular/core';
import { IntimationbuyerService } from '../intimationbuyer.service';

@Component({
  selector: 'app-intimationbuyermanager',
  templateUrl: './intimationbuyermanager.component.html',
  styleUrls: ['./intimationbuyermanager.component.css']
})
export class IntimationbuyermanagerComponent implements OnInit {
  data: any;
  page = 0;
  // totalpage: any;
  // streamName: any;
  // streamDatas: any;
  constructor(private api: IntimationbuyerService) { }
  ngOnInit(): void {
    this.fetchStreamingDetails();
  }
  // ngOninit(){

  // }

  showPopup = -1;
  close() {
    this.showPopup = -1;
  }
  fetchStreamingDetails() {
    this.api.fetchStreamingDetails(this.page).subscribe((res: any) => {
      this.data = res.values;
      this.next = res.next;
    });
  }
  show(value: any) {
    this.streamDatas = value;
    this.showPopup = 1;
  }
  streamDatas: any;


  next: any = false;
  pagination(type: any) {

    console.log(type)
    if (type == 'prev') {
      this.page--;
    }
    if (type == 'next') {
      this.page++;
    }
    this.fetchStreamingDetails();
  }
}
