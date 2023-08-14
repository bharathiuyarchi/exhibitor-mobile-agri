import { SocketioService_sub } from './../socketio.service';
import { Managelivestream_sub } from './../managelivestream.module';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Env } from 'src/app/environment';

@Component({
  selector: 'app-assigned-streams',
  templateUrl: './assigned-streams.component.html',
  styleUrls: ['./assigned-streams.component.css']
})
export class AssignedStreamsComponent implements OnInit {
  streams: any;
  page = 0;

  iso: any;
  setinterval: any;
  baseURL: any = Env.baseAPi
date_now = new Date().getTime()

  setTimeinterval() {
    this.iso = new Date().getTime()
    this.setinterval = setInterval(() => {
      this.iso = new Date().getTime()
      // console.log(this.iso, 11111)
    }, 1000)
  }
  next: any = false;
  ngOnInit(): void {
    this.date_now = new Date().getTime()
    this.get_streams(this.page);
    this.setTimeinterval()
  }
  constructor(public api: Managelivestream_sub, public route: ActivatedRoute, public router: Router, public socket: SocketioService_sub) {

  }
  ngOnDestroy(): void {

    clearInterval(this.setinterval)
  }
  my_stream: any;

  get_streams(page: any) {
    this.api.get_all_plans(page,this.sortForm).subscribe((res: any) => {
      console.log(res)
      this.my_stream = res.value;
      this.next = res.next;
      res.value.forEach((e: any) => {
        this.socket.get_user_Register(e._id).subscribe((msg: any) => {
          console.log(msg)
          let index = this.my_stream.findIndex((e: any) => e._id == msg.streamId);
          if (index != -1) {
            this.my_stream[index].registeredUsers = msg.count;
            console.log(this.my_stream[index])
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

  viewstream: any;
  view_stream(item: any) {
    this.viewstream = item;
  }

  go_live(item: any) {
    let data = {
      isPublisher: true,
      type: "subhost",
      streamId: item._id
    }
    this.api.create_token(data).subscribe((res: any) => {
      console.log(res)
      this.router.navigateByUrl('stream/golive?id=' + item._id)
    })
  }


  sortForm: any = 'All';
  sort_byr(type: any) {
    this.sortForm = type;
    this.page=0;
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
  close_popup() {
    this.view_details = null;
    this.view_details_type = null;
  }
  change_view(type: any) {
    this.view_details_type = type;
  }
  chat_now(item: any) {
    this.api.join_chat_now(item._id).subscribe((res: any) => {
      console.log(res)
      this.router.navigateByUrl('/stream/chatnow/' + res._id)
    })
  }

}
