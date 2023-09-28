import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Env } from 'src/app/environment';

@Injectable({
  providedIn: 'root'
})
export class CompletestreamService {

  constructor(public http: HttpClient) { }
  baseURL = Env.baseAPi
  //not using
  get_stream_posts(id: any) {
    return this.http.get(this.baseURL + '/v1/ecomplan/get/post/after/complete/stream?id=' + id);
  }
  start_end_time_update(id: any, data: any) {
    return this.http.put(this.baseURL + '/v1/ecomplan/update/start/end/time?id=' + id, data);
  }
  video_upload_post(id: any, file: any) {
    return this.http.put(this.baseURL + '/v1/ecomplan/update/video/post?id=' + id, file, { reportProgress: true, observe: 'events' });

  }
  get_video_link(id: any) {
    return this.http.get(this.baseURL + '/v1/ecomplan/get/video/link?id=' + id);
  }


  get_video_blob(url: any) {
    return this.http.get('https://streamingupload.s3.ap-south-1.amazonaws.com/' + url, { responseType: 'blob', observe: 'events', reportProgress: true, });
  }

  downloadFile(url: string): Observable<number | Blob> {
    // const headers = new HttpHeaders({ 'Content-Type': 'application/octet-stream' });

    // { headers: { loader: 'false' }
    return this.http.get('https://streamingupload.s3.ap-south-1.amazonaws.com/' + url, {
      headers: { loader: 'false' },
      observe: 'events', // Required to observe download progress events
      responseType: 'blob', // Indicate the response type is a binary blob
      reportProgress: true, // Enable progress tracking
    }).pipe(
      map((event: any) => {
        if (event.type === HttpEventType.DownloadProgress) {
          const percentDone = Math.round((100 * event.loaded) / event.total);
          return percentDone; // Emit download progress percentage
        } else if (event.type === HttpEventType.Response) {
          return event.body; // Emit the downloaded file Blob when completed
        }
      })
    );
  }
  upload_steram_video(file: any, id: any): Observable<number | Blob> {
    const formData = new FormData();
    formData.append('video', file);
    return this.http.post(this.baseURL + "/v1/ecomplan/upload/stream/video/byuser?id=" + id, formData, { headers: { loader: 'false' }, observe: 'events', reportProgress: true, }).pipe(
      map((event: any) => {

        if (event.type === HttpEventType.UploadProgress) {
          const percentDone = Math.round((100 * event.loaded) / event.total);
          return percentDone; 
        } else if (event.type === HttpEventType.Response) {
          return event.body; 
        }
      })
    );;
  }
  update_video_show(body: any) {
    return this.http.put(this.baseURL + "/v1/ecomplan/completed/show/visitor/video", body);
  }
}
