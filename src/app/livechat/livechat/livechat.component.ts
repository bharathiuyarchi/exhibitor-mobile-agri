import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { LivechatService } from '../livechat.service';
import { ActivatedRoute } from '@angular/router';
declare let $: any;
@Component({
  selector: 'app-livechat',
  templateUrl: './livechat.component.html',
  styleUrls: ['./livechat.component.css']
})
export class LivechatComponent implements OnInit {

  constructor(public fb: FormBuilder, public api: LivechatService, private route: ActivatedRoute) { }
  id: any;
  stream: any;
  streamDetails: any;
  ngOnInit(): void {
    this.route.paramMap.subscribe((res: any) => {
      this.id = res.params.id;
      this.api.join_chat_now(this.id).subscribe((res: any) => {
        this.streamDetails = res.streamrequests;
        this.stream = res;
        this.chatmessages.patchValue({
          channel: res.streamId
        })
        this.api.get_old_chats(res.streamId).subscribe((res: any) => {
          res.forEach((element: any) => {
            this.addLesson(element.text, this.stream.streamId == element.joinuser ? 'me' : 'others', element.userId, element.userName, element);
          });
          setTimeout(() => {
            this.scrollpage();
          }, 100)

        })
        // 
        this.api.romove_message_controls(res.streamId).subscribe(msg => {
          let index = this.addpro.value.findIndex((addpro: any) => addpro._id === msg._id)
          if (index != -1) {
            this.addpro.removeAt(index)
          }

        });
        this.api.getMessage_new_chat(res.streamId).subscribe(msg => {
          this.addLesson(msg.text, this.stream.streamId == msg.joinuser ? 'me' : 'others', msg.userId, msg.userName, msg);
          this.scrollpage();
        });
      })

    })

  }
  ban_user_now: any = false;
  baan_user(user: any, ban: any, remove: any) {
    this.ban_user_now = true;
    $(user).hide();
    $(remove).addClass('hide_remove')
    $(ban).show();
  }
  back_message(user: any, ban: any, remove: any) {
    this.ban_user_now = false;
    $(user).show();
    $(remove).removeClass('hide_remove')
    $(ban).hide();
  }
  remove_message(item: any) {
    console.log(item)
    this.api.romove_message(item)
  }
  ban_user_chat(user: any, ban: any, remove: any, item: any) {
    $(user).show();
    $(remove).removeClass('hide_remove')
    $(ban).hide();
    this.api.ban_user_chat(item)
  }
  chat_now() {
  }
  type_message: any = new FormControl('', Validators.required);
  send_now() {
    if (this.type_message.valid) {
      // this.addLesson(this.type_message.value, "me", this.sub.uid);
      let send = {
        channel: this.chatmessages.get("channel").value,
        text: this.type_message.value,
        userId: this.stream.Uid,
        id: this.stream.streamId
      }
      console.log(send, 'assad')

      this.api.send_message(send)
      this.type_message.reset();
      this.scrollpage();
      $("#chat-boxs").focus();
    }
  }
  chatmessages: any = this.fb.group({
    message: this.fb.array([], Validators.required),
    channel: new FormControl(),
  })
  get addpro() {
    return this.chatmessages.controls["message"] as FormArray;
  }
  addLesson(message: any, user: any, userId: any, userName: any, all: any) {
    const lessonForm = this.fb.group({
      type: user,
      text: message,
      userId: userId,
      userName: userName,
      _id: all._id,
      channel: all.channel,
      joinuser: all.joinuser
    });

    this.addpro.push(lessonForm);
  }

  scrollpage() {
    $('.contant-box ol').stop().animate({
      scrollTop: $(".contant-box").height() * 150
    }, 500);
  }

}
