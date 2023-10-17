import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Env } from 'src/app/environment';
import { ManagestreamrequestService } from '../managestreamrequest.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

declare let $: any;

@Component({
  selector: 'app-createstreamrequest',
  templateUrl: './createstreamrequest.component.html',
  styleUrls: ['./createstreamrequest.component.css']
})
export class CreatestreamrequestComponent implements OnInit {
  baseURL: any = Env.baseAPi;
  constructor(
    public api: ManagestreamrequestService,
    public router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) { }
  id: any;
  expire_date: any;
  now_date: any;
  ngOnInit(): void {
    this.get_Planes();
    this.route.queryParams.subscribe((params: any) => {
      this.id = params.id;
      if (params.id != null) {
        this.get_requrement(this.id);
      } else {
        // this.get_purchasePlans();
      }
    });
    this.now_date =
      formatDate(new Date(), "yyyy-MM-dd", "en-IN") +
      "T" +
      formatDate(new Date(), "HH:mm", "en-IN");
    console.log(this.now_date, 1271);
  }
  remove_file(type: any) {
    this.api.remove_files(type, this.id).subscribe((res: any) => {
      this.get_requrement(this.id);
    })
  }
  stepOne: any;
  // myplans: any;
  // get_purchasePlans() {
  //   this.api.get_purchasePlans().subscribe((res: any) => {
  //     this.myplans = res;
  //     if (res.length != 0) {
  //       this.selectPlan = res[0];
  //       console.log(this.selectPlan, 298218);
  //       this.change_allot_stream();
  //     }
  //   });
  // }

  change_allot_stream() {
    if (this.selectPlan.no_of_host == 1) {
      this.postRequest.get("allot_host_1")?.addValidators(Validators.required);
    } else {
      this.postRequest.get("allot_host_1")?.clearValidators();
    }
  }
  get_requrement(id: any) {
    this.api.get_one_request(id).subscribe((res: any) => {
      this.stepOne = res;
      this.selectPlan = res.purchasedplans;
      this.postRequest.get("post").setErrors(null);
      this.postRequest.get("planId").setErrors(null);
      this.postRequest.get("slot").setErrors(null);

      this.postRequest.patchValue({
        streamName: res.streamName,
        primarycommunication: res.primarycommunication,
        secondarycommunication: res.secondarycommunication,
        discription: res.discription,
        // chat_need: res.chat_need,
        Location: res.Location,
        transaction: res.transaction,
        broucherName: res.broucherName
      });
      if (this.selectPlan.PostCount == res.post.length) {
        this.used_max_post = true;
      }
      this.change_allot_stream();
    });
  }
  postRequest: any = new FormGroup({
    post: new FormControl([], Validators.required),
    primarycommunication: new FormControl(null, Validators.required),
    discription: new FormControl(null, Validators.required),
    streamName: new FormControl(null, Validators.required),
    planId: new FormControl(null, Validators.required),
    // chat_need: new FormControl("no", Validators.required),
    Location: new FormControl(null, Validators.required),
    slot: new FormControl(null, Validators.required),
    transaction: new FormControl(null),
    secondarycommunication: new FormControl(null),
    broucherName: new FormControl()

  });
  selectPlan: any;
  removeImageshop() {
    this.selected_image = null;
    this.selected_image_view = null;
  }
  removevideohop() {
    this.selected_video = null;
    this.selected_video_view = null;
  }
  mouseover(classs: any) {
    $("." + classs).addClass("edit-image");
    $("." + classs + " label").text("Change");
  }
  mouseout(classs: any) {
    $("." + classs).removeClass("edit-image");
  }


  BookedSlots: any;
  selected_plan: any;
  change_plan(event: any) {
    let id = event.target.value;
    if (id != null) {
      let index = this.planes.findIndex((a: any) => a._id == id);
      if (index != null) {
        this.selected_plan = this.planes[index];
        this.postRequest.patchValue({ transaction: this.selected_plan.transaction })
        console.log(this.selected_plan, 987657)
      }
    }
    this.api.Booked_slots_Byusers(id).subscribe((a: any) => {
      console.log(a)
      this.BookedSlots = a;
    });
    this.get_posts(id);
  }
  open_preview() {
    console.log(this.postRequest.value)
    this.submited = true;
    if (this.id == null) {
      if (this.postRequest.valid) {
        this.submited = false;
        $("#preview-form").modal("show");
      }
    } else {
      this.create_stream_request();
    }
  }

  get_streamTitle(item: any) {
    let index = this.post_list.findIndex((val: any) => val._id == item);

    return this.post_list[index].productName;
  }

  getTime(item: any) {
    if (item != null) {
      item = item
        .toString()
        .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [item];
      if (item.length > 1) {
        item = item.slice(1);
        item[5] = +item[0] < 12 ? " AM" : " PM";
        item[0] = +item[0] % 12 || 12;
      }
      return item.join("");
    }
    return "";
  }

  planes: any;
  get_Planes() {
    this.api.get_Planes().subscribe((e: any) => {
      this.planes = e;
    });
  }

  create_stream_request() {
    this.submited = true;
    if (this.id == null) {
      if (this.postRequest.valid) {
        this.postRequest.patchValue({
          broucherName: this.selected_broucher_view == null ? null : this.selected_broucher_view
        })
        this.submited = false;
        this.api.create_request_one(this.postRequest.value).subscribe((res: any) => {
          this.id = res._id;
          if (this.selected_image != null) {
            var image = new FormData();
            image.append("image", this.selected_image, this.selected_image["name"]
            );
            this.api.create_request_one_image(image, res._id)
              .subscribe((res: any) => {

                $("#preview-form").modal("hide");
                this.router.navigateByUrl("/dashboard/stream");
              });
          }
          if (this.selected_broucher != null) {
            var broucher = new FormData();
            broucher.append("broucher", this.selected_broucher, this.selected_broucher["name"]
            );
            this.api.create_request_one_broucher(broucher, res._id)
              .subscribe((res: any) => {
                console.log(res, "image");
                $("#preview-form").modal("hide");
                this.router.navigateByUrl("/dashboard/stream");
              });
          }
          if (this.selected_video != null) {
            var video = new FormData();
            video.append("teaser", this.selected_video, this.selected_video["name"]);
            this.api.create_request_one_video(video, res._id)
              .subscribe((res: any) => {
                console.log(res, "video");
                $("#preview-form").modal("hide");
                this.router.navigateByUrl("/dashboard/stream");
              });
          }
          if (this.selected_video == null && this.selected_broucher == null && this.selected_video == null) {
            $("#preview-form").modal("hide");
            this.router.navigateByUrl("/dashboard/stream");
          }
        });

      }
    }
    else {
      if (this.postRequest.valid) {
        let date = {
          addpost: this.postRequest.get("post")?.value,
          primarycommunication: this.postRequest.get("primarycommunication")?.value,
          secondarycommunication: this.postRequest.get("secondarycommunication")?.value,
          discription: this.postRequest.get("discription")?.value,
          streamName: this.postRequest.get("streamName")?.value,
          // chat_need: this.postRequest.get("chat_need")?.value,
          Location: this.postRequest.get("Location")?.value,
          transaction: this.postRequest.get("transaction")?.value,
          broucherName: this.selected_broucher_view == null ? this.postRequest.get("broucherName")?.value : this.selected_broucher_view

        };
        this.api.update_request_one(date, this.id).subscribe((res: any) => {
          $("#preview-form").modal("hide");
          this.router.navigateByUrl("/dashboard/stream");
        });
        if (this.selected_image != null) {
          var image = new FormData();
          image.append("image", this.selected_image, this.selected_image["name"]);
          this.api.create_request_one_image(image, this.id).subscribe((res: any) => {
            $("#preview-form").modal("hide");
            this.router.navigateByUrl("/dashboard/stream");
          });
        }
        if (this.selected_broucher != null) {
          var broucher = new FormData();
          broucher.append("broucher", this.selected_broucher, this.selected_broucher["name"]);
          this.api.create_request_one_broucher(broucher, this.id).subscribe((res: any) => {
            $("#preview-form").modal("hide");
            this.router.navigateByUrl("/dashboard/stream");
            console.log(res, "image");
          });
        }
        if (this.selected_video != null) {
          var video = new FormData();
          video.append("teaser", this.selected_video, this.selected_video["name"]);
          this.api.create_request_one_video(video, this.id)
            .subscribe((res: any) => {
              $("#preview-form").modal("hide");
              this.router.navigateByUrl("/dashboard/stream");
            });
        }
      }
    }
  }

  post_list: any;

  change_post(event: any) {
    console.log(this.selected_plan, this.selected_plan.PostCount)
    let oldpost = this.id == null ? 0 : this.stepOne.post.length;
    let post: any = [];
    if (this.postRequest.get("post")?.value != null) {
      post = this.postRequest.get("post")?.value;
    }
    let index = post.findIndex((a: any) => a == event.target.value);
    if (index != -1) {
      post.splice(index, 1);
    } else {
      if (this.selected_plan.PostCount <= post.length + oldpost) {
        $(event.target).prop("checked", false);
      } else {
        post.push(event.target.value);
      }
    }
    console.log(post);
    if (this.selected_plan.PostCount <= post.length + oldpost) {
      $("input[type='checkbox']").not(":checked").prop("disabled", true);
    } else {
      $("input[type='checkbox']").not(":checked").prop("disabled", false);
    }
    this.postRequest.get("post")?.setValue(post);
  }
  used_max_post: any = false;
  change_communication(event: any) {
    let post: any = [];
    if (this.postRequest.get("communicationMode")?.value != null) {
      post = this.postRequest.get("communicationMode")?.value;
    }
    let index = post.findIndex((a: any) => a == event.target.value);
    if (index != -1) {
      post.splice(index, 1);
    } else {
      post.push(event.target.value);
    }
    console.log(post);
    this.postRequest.get("communicationMode")?.setValue(post);
  }
  submited: any = false;
  delete_stream() { }
  get_posts(id: any) {
    this.api.get_all_post_trasation(id).subscribe((res: any) => {
      this.post_list = res;
    });
  }
  selected_image: any;
  selected_video: any;
  selected_video_error: any;
  selected_image_view: any;
  selected_video_view: any;
  change_image(event: any) {
    console.log(event.target.files);
    this.selected_image = null;
    if (event.target.files.length != 0) {
      if (
        event.target.files[0].type == "image/png" ||
        event.target.files[0].type == "image/jpg" ||
        event.target.files[0].type == "image/jpeg" ||
        event.target.files[0].type == "image/webp"
      ) {
        this.selected_image = event.target.files[0];
        const filereader = new FileReader();
        filereader.onload = (e: any) => {
          this.selected_image_view = e.target.result;
        };
        filereader.readAsDataURL(this.selected_image);
      } else {
        this.selected_image = "invalid";
      }
    }
  }
  selected_broucher: any
  selected_broucher_view: any
  change_broucher(event: any) {
    this.selected_broucher = null;
    if (event.target.files.length != 0) {
      console.log(event.target.files[0])
      if (
        event.target.files[0].type == ".ppt" ||
        event.target.files[0].type == ".pptx" || event.target.files[0].type == "application/pdf" || event.target.files[0].type == "application/vnd.openxmlformats-officedocument.presentationml.presentation") {
        this.selected_broucher = event.target.files[0];
        this.selected_broucher_view = this.selected_broucher.name;
        // const filereader = new FileReader();
        // filereader.onload = (e: any) => {
        //   this.selected_broucher_view = this.sanitizer.bypassSecurityTrustResourceUrl(e.target.result)
        // };
        // filereader.readAsDataURL(this.selected_broucher);
      } else {
        this.selected_broucher = "invalid";
      }
    }
  }
  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  removebroucher() {
    this.selected_broucher = null;
    this.selected_broucher_view = null;
  }
  change_video(event: any) {
    this.selected_video = null;
    this.selected_video_error = null
    if (event.target.files.length != 0) {
      if (event.target.files[0].type == "video/mp4") {
        let limit = 40 * 1024 * 1024;
        if (event.target.files[0].size < limit) {
          this.selected_video = event.target.files[0];
          const filereader = new FileReader();
          filereader.onload = (e: any) => {
            this.selected_video_view = e.target.result;
          };

          filereader.readAsDataURL(this.selected_video);
        }
        else {
          this.selected_video_view = null;
          this.selected_video_error = "Video Limit 40mb Only"
        }
      } else {
        this.selected_video_view = null;
        this.selected_video_error = "invalid video Format";
      }
    }
  }

  broucherName: any;
  selectedBroucher: any;
  change_Broucher(event: any) {
    this.broucherName = event.target.files[0].name;
    this.selectedBroucher = event.target.files[0];
  }

  change_date() {
    // let data = this.postRequest.get('streamingDate')?.value
    // let time = this.postRequest.get('streamingTime').value;

    let streamingDate_time = this.postRequest.get("streamingDate_time").value;

    let date: any = new Date(streamingDate_time);
    let year: any = date.getFullYear();
    let month: any = date.getMonth() + 1;
    let dt: any = date.getDate();
    let hours: any = date.getHours();
    let minutes: any = date.getMinutes();

    if (dt < 10) {
      dt = "0" + dt;
    }
    if (month < 10) {
      month = "0" + month;
    }
    this.postRequest
      .get("streamingDate")
      ?.setValue(year + "-" + month + "-" + dt);
    this.postRequest.get("streamingTime")?.setValue(hours + ":" + minutes);
    console.log(this.postRequest?.value);
  }

  maxlengths(element: any, maxvalue: any) {
    var q = element.target.value.length + 1;
    element.target.value = element.target.value.substring(0, 250);
    this.postRequest.get("discription").setValue(this.postRequest.get("discription").valid ? this.postRequest.get("discription").value.substring(0, 250) : '')
    if (q > maxvalue) {

      return false;
    } else {
      return true;
    }
  }
  onPaste(event: ClipboardEvent, element: any) {
    let clipboardData: any = event.clipboardData || window.Clipboard;
    let pastedText = clipboardData.getData('text');
    this.postRequest.get("discription").setValue(this.postRequest.get("discription").valid ? this.postRequest.get("discription").value.substring(0, 250) : '')
  }
  show_selected_post(id: any, item: any) {
    let postIndex = item.findIndex((a: any) => a._id == id);

    if (postIndex != -1) {
      return item[postIndex].productName;
    } else {
      return "sdajks";
    }
  }

  preview_details(id: any, item: any) {
    if (item == 'plan') {
      let index = this.planes.findIndex((a: any) => a._id == id);
      if (index != -1) {
        return this.planes[index].planName;
      }
    }
    if (item == 'slot') {
      let index = this.BookedSlots.findIndex((a: any) => a._id == id);
      if (index != -1) {
        return this.BookedSlots[index]
        // return this.BookedSlots[index].slotType + " - " + this.BookedSlots[index].Durations + this.BookedSlots[index].slots.date;
      }
    }
  }
}
