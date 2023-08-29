import { Component, HostListener, Input, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Managelivestream_sub } from '../managelivestream.module';
import { AgorastreamingService_sub } from '../agorastreaming.service';
import { SocketioService_sub } from '../socketio.service';

@Component({
  selector: 'raisehands-sub',
  templateUrl: './raisehands.component.html',
  styleUrls: ['./raisehands.component.css']
})
export class RaisehandsComponent_sub implements OnInit {
  private isDragging: boolean = false;
  private initialX: number = 0;
  private initialY: number = 0;
  private xOffset: number = 0;
  private yOffset: number = 0;
  show_permistion: any = 'start';
  @Input("nowTimae") nowTimae: any;

  loading: any = false;
  id: any;
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.id = params.id;
      // this.get_token(this.id);
      this.get_token_details();
      this.socket.get_request_users(this.id).subscribe((res: any) => {
        console.log(res)
        this.raised_users.push(res)

      })

    })
  }
  get_token_details() {
    this.api.get_raise_datails(this.id).subscribe((res: any) => {
      console.log(res)
      this.loading = true;
      this.show_permistion = res.raise_hands ? 'user' : 'start';
      this.raised_users = [...this.raised_users, ...res.raiseusers];
      this.waiting_user_join = res.current_raise;
    })
  }
  constructor(private api: Managelivestream_sub, private route: ActivatedRoute, private socket: SocketioService_sub, private agora: AgorastreamingService_sub) {

  }
  onDragStart(event: MouseEvent) {
    this.isDragging = true;
    this.initialX = event.clientX - this.xOffset;
    this.initialY = event.clientY - this.yOffset;
  }

  @HostListener('document:mouseup')
  onDragEnd() {
    this.isDragging = false;
  }
  @HostListener('document:mousemove', ['$event'])
  onDrag(event: MouseEvent) {
    if (!this.isDragging) {
      return;
    }
    this.xOffset = event.clientX - this.initialX;
    this.yOffset = event.clientY - this.initialY;
    const element = document.querySelector('.draggable') as HTMLElement;
    element.style.transform = `translate3d(${this.xOffset}px, ${this.yOffset}px, 0)`;
  }
  raised_users: any = [];
  start_raising() {
    this.api.start_raising(this.id).subscribe((res: any) => {
      this.show_permistion = "user";
      this.agora.raiseUID = res.Uid;
    })
  }


  close_request() {
    this.api.raise_hands.next(false);
  }
  approve_raise(item: any) {
    this.api.approve_raise(item._id).subscribe((res: any) => {
      console.log(res)
      this.waiting_user_join = item._id;
      item.status = "approved";
    })
  }
  reject_raise(item: any) {
    this.api.reject_raise(item._id).subscribe((res: any) => {
      console.log(res)
      item.status = "rejected";

    })
  }
  cansel_raise(item: any) {
    this.api.pending_raise(item._id).subscribe((res: any) => {
      console.log(res)
      this.waiting_user_join = null;
      item.status = "Pending";
    })
  }
  waiting_user_join: any;
  close_raise() {
    this.api.raise_hands.next(false);
  }
}



@Pipe({
  name: "minted_def_sub"
})
export class MinutedDef_sub implements PipeTransform {
  transform(value: number, nowtime: any): any {
    let created = new Date(value).getTime();
    let now = nowtime;
    let msDifference = now - created;
    let minutes = Math.floor(msDifference / 1000 / 60);

    if (minutes == 0) {
      return "Now";
    }
    else {
      return minutes + " mins ago";

    }
  }


}