import { Component, OnInit } from '@angular/core';
import { InitialstockmanagerService } from '../initialstockmanager.service';

@Component({
  selector: 'app-initialstocks',
  templateUrl: './initialstocks.component.html',
  styleUrls: ['./initialstocks.component.css']
})
export class InitialstocksComponent implements OnInit {

  ngOnInit(): void {
    this.fetchStreamingDetails();
  }
  constructor(private api: InitialstockmanagerService) {

  }
  page = 0;

  data: any;
  fetchStreamingDetails() {
    this.api.fetchStreamingDetails(this.page).subscribe((res: any) => {
      console.log(res, 12312)
      this.data = res.values;
      this.next = res.next
    })
  }
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

  viewDetails: any;
  view_stream(item: any) {
    this.showPopup = 'product';
    this.viewDetails = item;
    console.log(item)
  }
  showPopup: any = '';
  closepopup() {
    this.showPopup = '';
  }

}
