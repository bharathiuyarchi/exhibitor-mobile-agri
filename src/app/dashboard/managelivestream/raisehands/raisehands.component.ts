import { Component, HostListener, Input, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ManagelivestreamService } from '../managelivestream.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SocketioService } from '../socketio.service';
import { AgorastreamingService } from '../agorastreaming.service';
import { PendingChangesGuard } from '../can-deactivate.guard';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'raisehands',
  templateUrl: './raisehands.component.html',
  styleUrls: ['./raisehands.component.css']
})
export class RaisehandsComponent implements OnInit {
  constructor(private api: ManagelivestreamService, private route: ActivatedRoute, private socket: SocketioService, private agora: AgorastreamingService) {}
  private isDragging: boolean = false;
  private initialX: number = 0;
  private initialY: number = 0;
  private xOffset: number = 0;
  private yOffset: number = 0;
  @Input("nowTimae") nowTimae: any;
  show_permistion: any = 'start';
  loading: any = false;
  id: any;
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.id = params.id;
      // this.get_token(this.id);
      this.get_token_details();
      this.socket.get_request_users(this.id).subscribe((res: any) => {
        console.log(res,98786786)
        let index = this.raised_users.findIndex((a: any) => a._id == res._id);
        if (index == -1) {
          this.raised_users.push(res)
        }
        else {
          this.raised_users[index].status = res.status;
          this.raised_users[index].already_joined = res.already_joined;
          this.raised_users[index].raised_count = res.status == 'end' ? 0 : res.raised_count;
          this.raised_users[index].updatedAt = res.updatedAt;
          if (res.status == 'end' && res._id == this.waiting_user_join) {
            this.waiting_user_join = null;
          }
        }

        console.log(this.raised_users)
      })
    })
  }
  get_token_details() {
    this.api.get_raise_datails(this.id).subscribe((res: any) => {
      console.log(res)
      this.loading = true;
      this.raise_hand_option.patchValue(res.raise_hands);
      this.show_permistion = res.raise_hands ? 'user' : 'start';
      this.raised_users = [...this.raised_users, ...res.raiseusers];
      this.waiting_user_join = res.current_raise;
    })
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
      this.waiting_user_join = null;
    })
  }
  waiting_user_join: any;
  close_raise() {
    this.api.raise_hands.next(false);
  }
  raise_hand_option: any = new FormControl(true);
  raise_hand_action(event: any) {
    this.api.start_raising(this.id).subscribe((res: any) => {
      console.log(res)
      this.raise_hand_option.patchValue(res.raise_hands)
      this.get_token_details();
      this.agora.raiseUID = res.Uid;
      this.raised_users = []
    })
  }
}



@Pipe({
  name: "minted_def"
})
export class MinutedDef implements PipeTransform {
  transform(value: number, nowtime: any): any {
    let created = new Date(value).getTime();
    let now = nowtime;
    let msDifference = now - created;
    let minutes = Math.floor(msDifference / 1000 / 60);

    if (minutes <= 0) {
      return "Now";
    }
    else {
      return minutes + " mins ago";

    }
  }
}
