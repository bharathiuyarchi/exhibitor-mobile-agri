import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IntimationbuyerService } from '../intimationbuyer.service';

@Component({
  selector: 'app-buyerview',
  templateUrl: './buyerview.component.html',
  styleUrls: ['./buyerview.component.css']
})
export class BuyerviewComponent {
  id: any;
  data: any;
  popupData: any;
  order: any;
  page = 0;
  filter: any = { name: '', status: '' };
  constructor(
    private intimationBuyerService: IntimationbuyerService,
    private Aroute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.Aroute.queryParams.subscribe((params: any) => {
      this.id = params['id'];
    });
    this.getOrders();
  }

  getOrders() {
    return this.intimationBuyerService.fetchData(this.id, this.page, this.filter).subscribe((res: any) => { this.data = res.values; });
  }
  showPopup = -1;

  show(val: any) {
    this.popupData = val.orderedProducts;
    this.showPopup = 1
  }
  close() {
    this.showPopup = -1;
    this.popupData = null
  }
  confirmClick(id: any, msg: any) {
    this.intimationBuyerService.confirmClick(id, msg).subscribe((e: any) => { console.log(e); this.getOrders(); });
  }

}
