import { Component, Input, OnInit } from '@angular/core';
import { Env } from 'src/app/environment';
import { SocketioService } from '../socketio.service';

@Component({
  selector: 'app-productlistshow',
  templateUrl: './productlistshow.component.html',
  styleUrls: ['./productlistshow.component.css']
})
export class ProductlistshowComponent implements OnInit {

  @Input("id") id: any;
  @Input("streamDetails") streamDetails: any;
  baseURL = Env.baseAPi
  constructor(public Socket: SocketioService) { }
  primaryHost: any = false;
  streamProduct: any;
  baseURl: any = Env.baseAPi;
  ngOnInit(): void {
    console.log(this.id)
    console.log(this.streamDetails, '123123126878')
    if (this.streamDetails != null) {
      this.get_post_details();
      this.streamPending = this.streamDetails.streamPending == false ? false : true;
      this.primaryHost = this.streamDetails.primaryHost;
      this.streamProduct = this.streamDetails.streamrequestposts
    }
    this.Socket.get_cart_qty(this.id).subscribe((res: any) => {
      console.log(res, 213567)

      res.forEach((element: any) => {
        let index = this.streamProduct.findIndex((a: any) => a._id == element._id);
        if (index != -1) {
          this.streamProduct[index].stream_cart = element.stream_cart;
          this.streamProduct[index].stream_checkout = element.stream_checkout;
        }
      });
    })
  }

  get_post_details() {
    this.Socket.get_post_details(this.streamDetails._id).subscribe((res: any) => {
      console.log(res)
      this.streamProduct = res.value[0].streamrequestposts;
    })
  }
  streamPending: any = false;
  productView(val: any) {
    console.log(val, 12312)
    this.Socket.productView.next(val)
  }
}
