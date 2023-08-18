import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { Env } from '../environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LivechatService {

  private socket: Socket;
  private url = Env.baseAPi; // your server local path
  // private url = "http://localhost:3000"; // your server local path

  constructor(private http:HttpClient) {
    this.socket = io(this.url, { transports: ['websocket', 'polling', 'flashsocket'] });
  }
  getMessage_new(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('subscriberjoined', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });
  }
  getMessage_new_chat(channel: any): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on(channel, (data: any) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });
  }
  send_message(body: any) {
    return this.socket.emit('groupchathost', body);
  }
  getMessage_userCount(channel: any): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on(channel + '_count', (data: any) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });
  }
  leave_live(channel: any): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on(channel + 'admin_action', (data: any) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });
  }



  get_user_Register(channel: any): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on(channel + "_userjoined", (data: any) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });
  }

  toggle_controls(body: any) {
    return this.socket.emit('toggle_controls', body);
  }
  start_stop_post_stream(body: any) {
    return this.socket.emit('post_start_end', body);
  }

  get_post_details(stream: any) {
    return new Observable<any>(observer => {
      this.socket.on(stream + 'postStart', (data: any) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });
  }

  leave_subhost(data: any) {
    return this.socket.emit('leave_subhost', data);
  }
  mainhost_remove_live(channel: any, uid: any): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on(channel + uid, (data: any) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });
  }

  media_controls_audio(token: any, uid: any): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on(token + uid + "_audio", (data: any) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });
  }

  media_controls_video(token: any, uid: any): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on(token + uid + "_video", (data: any) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });
  }


  media_controls_all(token: any, uid: any): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on(token + uid + "_all", (data: any) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });
  }
  allow_stream_controls(token: any, uid: any): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on(token + uid + "allow_stream", (data: any) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });
  }
  host_controll_audio(data: any) {
    return this.socket.emit('host_controll_audio', data);

  }
  host_controll_video(data: any) {
    return this.socket.emit('host_controll_video', data);

  }
  host_controll_all(data: any) {
    return this.socket.emit('host_controll_all', data);

  }

  allow_subhost(data: any) {
    return this.socket.emit('allow_subhost', data);
  }

  stream_view_change(data: any) {
    return this.socket.emit('stream_view_change', data);
  }

  stream_view_change_controls(token: any,): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on(token + "stream_view_change", (data: any) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });
  }
  romove_message(data: any) {
    return this.socket.emit('romove_message', data);
  }

  romove_message_controls(token: any,): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on(token + "remove_image", (data: any) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });
  }

  ban_user_chat(data: any) {
    return this.socket.emit('ban_user_chat', data);
  }
  main_host_end_strem(token: any): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on(token + "_stream_end", (data: any) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });
  }
  get_cart_qty(id: any): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on(id + "cart_qty", (data: any) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });
  }
  get_old_chats(channel: any) {
    return this.http.get(this.url + "/v2/chat/getoldchats?channel=" + channel)
  }

  join_chat_now(id: any) {
    return this.http.get(this.url + "/v1/ecomplan/get/chat/join?id=" + id)
  }
}
