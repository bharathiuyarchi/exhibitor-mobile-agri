import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Env } from 'src/app/environment';
import { ManagelivestreamService } from '../managelivestream.service';
import { SocketioService } from '../socketio.service';

@Component({
  selector: 'app-managelivestream',
  templateUrl: './managelivestream.component.html',
  styleUrls: ['./managelivestream.component.css']
})
export class ManagelivestreamComponent {

  streams: any;
  page = 0;
  iso: any;
  setinterval: any;
  baseURL: any = Env.baseAPi

  setTimeinterval() {
    this.iso = new Date().getTime()
    this.setinterval = setInterval(() => {
      this.iso = new Date().getTime()
      // console.log(this.iso, 11111)
    }, 1000)
  }
  ngOnInit(): void {
    this.get_streams(this.page);
    this.setTimeinterval()
  }
  constructor(public api: ManagelivestreamService, public route: ActivatedRoute, public router: Router, public socket: SocketioService) {

  }
  ngOnDestroy(): void {

    clearInterval(this.setinterval)
  }
  my_stream: any;
  next: any = false;
  get_streams(page: any) {
    this.api.get_all_plans(page).subscribe((res: any) => {
      console.log(res)
      this.my_stream = res.value;
      this.next = res.next;
      res.value.forEach((e: any) => {
        this.socket.get_user_Register(e._id).subscribe((msg: any) => {
          console.log(msg)
          let index = this.my_stream.findIndex((e: any) => e._id == msg.streamId);
          if (index != -1) {
            this.my_stream[index].registeredUsers = msg.count;
          }
        });
      });
    })
  }
  pagination(type: any) {

    console.log(type)
    if (type == 'prev') {
      this.page--;
    }
    if (type == 'next') {
      this.page++;
    }
    this.get_streams(this.page);
  }

  view_details: any;
  view_details_type: any;
  view_request(type: any, item: any) {
    console.log(item)
    this.view_details = item;
    this.view_details_type = type;
    // $('#view_details').modal('show');
  }
  go_live(item: any) {
    let data = {
      isPublisher: true,
      type: "host",
      streamId: item._id
    }
    this.api.create_token(data).subscribe((res: any) => {
      this.router.navigateByUrl('dashboard/livestream/golive?id=' + item._id);
    })
  }
  close_popup() {
    this.view_details = null;
    this.view_details_type = null;
  }
  change_view(type: any) {
    this.view_details_type = type;
  }


  sortForm: any = 'All';
  sort_byr(type: any) {
    this.sortForm = type;
  }

  share(item: any) {
    console.log(item)

    if (navigator.share) {
      navigator
        .share({
          title: item.streamName,
          text: item.discription,
          url: "https://buyer.lotsmart.in/dashboard/view/" + item._id,
        }
        )
        .then(() => console.log('Successful share'))
        .catch((error: any) => console.log('Error sharing', error));
    } else {
    }
  }
}
