import { Env } from 'src/app/environment';
import { Component, Input, OnInit } from '@angular/core';
import { SocketioService_sub } from '../socketio.service';
import { HostserviceService_sub } from '../hostservice.service';

@Component({
  selector: 'app-productdetailview-sub',
  templateUrl: './productdetailview.component.html',
  styleUrls: ['./productdetailview.component.css']
})
export class ProductdetailviewComponent_sub implements OnInit {

  @Input('data') data: any;

  constructor(private api: HostserviceService_sub, private web: SocketioService_sub) {

  }
  baseUrl = Env.baseAPi;

  viewProduct: any;

  ngOnInit(): void {
    console.log(this.data, 12312312)
    if (this.data != null) {
      this.get_post_view(this.data.streampostsId)
    }
  }
  get_post_view(id: any) {
    this.api.get_post_view(id).subscribe((res: any) => {
      console.log(res, 123123123123)
      this.viewProduct = res;
    })
  }
  down_now() {
    this.web.productView.next(null)
  }

}
