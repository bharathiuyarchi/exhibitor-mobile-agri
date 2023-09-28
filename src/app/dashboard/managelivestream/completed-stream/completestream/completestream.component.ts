import { CompletestreamService } from './../completestream.service';
import { Component, OnInit, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpEventType, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';


declare let $: any;
@Component({
  selector: 'app-completestream',
  templateUrl: './completestream.component.html',
  styleUrls: ['./completestream.component.css']
})
export class CompletestreamComponent implements OnInit {
  stream_post: any;

  constructor(public route: ActivatedRoute, public api: CompletestreamService) {

  }
  streamId: any;
  streamdetails: any;
  video_list: any;
  ngOnInit(): void {
    this.route.queryParamMap.subscribe((res: any) => {
      console.log(res.params.id)
      this.streamId = res.params.id;
      this.get_stream_post(this.streamId);
    })
  }

  get_stream_post(id: any) {
    this.api.get_stream_posts(id).subscribe((res: any) => {
      console.log(res)
      this.video_list = res.temptokens;
      this.streamdetails = res;
      this.old_select = res.selectvideo;
      this.visitor_show.setValue(res.selectvideo);
    })
  }
  play_video_up() {
    this.videoLink = this.streamdetails.uploadLink;
    this.videoname = 'upload';
  }
  videoLink: any;
  videoname: any;
  play_video(item: any, i: any) {
    this.videoLink = 'https://streamingupload.s3.ap-south-1.amazonaws.com/' + item.videoLink_mp4;
    this.videoname = i + 1;
  }
  uploadForm: any = new FormGroup({
    hours: new FormControl(''),
    minutes: new FormControl(''),
    second: new FormControl(''),
  })
  onMetadata(e: any, video: any) {
    if (video.duration != null && video.duration != '') {
      this.totalDuration = parseInt(video.duration);
    }
  }
  totalDuration: any = 0;
  selectTime: any = 0;
  uploadForm_submit(Close: any) {

    console.log(this.uploadForm.value)
    let hours = this.uploadForm.value.hours;
    let minutes = this.uploadForm.value.minutes;
    let second = this.uploadForm.value.second;

    let totalsec = 0;
    if (hours != null && hours != '') {
      totalsec += parseInt(hours) * 3600;
    }
    if (minutes != null && minutes != '') {
      totalsec += parseInt(minutes) * 60;
    }
    if (second != null && second != '') {
      totalsec += parseInt(second)

    }
    this.selectTime = totalsec;
    console.log(totalsec)
    console.log(this.totalDuration)

    if (this.uploadForm.get('hours').value != '' && this.uploadForm.get('hours').value != null || this.uploadForm.get('minutes').value != '' && this.uploadForm.get('minutes').value != null || this.uploadForm.get('second').value != '' && this.uploadForm.get('second').value != null) {
      if (totalsec < this.totalDuration) {
        this.api.start_end_time_update(this.view_details.streampostId, this.uploadForm.value).subscribe((res: any) => {
          this.get_stream_post(this.streamId);
          this.uploadForm.reset();
          Close.click();
          this.get_stream_post(this.streamId);
        })
      }
    }
  }
  update_video_show() {
    if (this.visitor_show.valid) {
      this.api.update_video_show({ stream: this.streamId, show: this.visitor_show.value }).subscribe((res: any) => {
        this.old_select = this.visitor_show.value
      })
    }
  }
  uploadProgress: any = 0
  choose_video(event: any) {
    if (event.target.files.length != 0) {
      this.uploadForm.get('video')?.setValue(event.target.files[0])
    }
    else {
      this.uploadForm.get('video')?.setValue(null)
    }
  }
  choose_method(event: any) {
    if (event.target.value == 'SetTime') {
      this.uploadForm.get('videoStart')?.setErrors({ incorrect: true })
      this.uploadForm.get('videoEnd')?.setErrors({ incorrect: true })
      this.uploadForm.get('video')?.setErrors(null)
    }
    if (event.target.value == 'UploadExclusiveVideo') {
      this.uploadForm.get('videoStart')?.setErrors(null)
      this.uploadForm.get('videoEnd')?.setErrors(null)
      this.uploadForm.get('video')?.setErrors({ incorrect: true })
    }
  }

  view_details: any;

  progressType: any = 0;

  start_uploading: any = null;
  download_video(dataurl: any, filename: any, i: any) {
    this.progressType = 0;
    console.log("sd")
    this.api.downloadFile(dataurl).subscribe(
      (progress: any) => {
        if (typeof progress === 'number') {
          this.start_uploading = progress;
        } else if (progress instanceof Blob) {
          this.start_uploading = null;
          this.createDownloadLink(progress, filename, i)
        }
      },
      error => {
        console.error('Download Error:', error);
      }
    );
  }
  private createDownloadLink(blob: Blob, name: any, i: any): void {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name + '-' + parseInt(i + 1) + '.mp4'; // Set the desired filename for the downloaded video
    a.click();
    window.URL.revokeObjectURL(url);
  }
  selected_video_view: any;
  selected_file: any;
  select_file(event: any) {
    // this.start_uploading = 0;
    if (event.target.files.length > 0) {
      this.selected_file = event.target.files[0];
      const filereader = new FileReader();
      filereader.onload = (e: any) => {
        this.selected_video_view = e.target.result;
      };
      filereader.readAsDataURL(this.selected_file);
      $("#confirm_message").modal('show');
    }
  }
  upload_video() {
    this.progressType = 1;
    if (this.selected_file != null) {
      this.api.upload_steram_video(this.selected_file, this.streamId).subscribe(
        (progress: any) => {
          if (typeof progress === 'number') {
            this.start_uploading = progress;
          } else if (progress instanceof Blob) {
            this.start_uploading = null;
            this.get_stream_post(this.streamId);
          }
        },
        error => {
          console.error('Download Error:', error);
        }
      );


      // .subscribe((event: any) => {
      //   if (event.type === HttpEventType.UploadProgress) {
      //     this.start_uploading = Math.round((100 * event.loaded) / event.total);
      //   } else if (event.type === HttpEventType.Response) {
      //     this.start_uploading = null;
      //     this.get_stream_post(this.streamId);
      //   }
      // })
    }
  }
  select_video(event: any) {
    console.log(event)
  }
  old_select: any = null;

  visitor_show: any = new FormControl(null, Validators.required);

  addItem(newItem: any) {
    location.reload();
  }
}





@Pipe({
  name: "hoursformat"
})
export class Hourformat implements PipeTransform {
  constructor(public router: Router) {

  }
  transform(value: number, option: any): any {
    let total: any = value / 60;

    return parseInt(total);
  }


}
