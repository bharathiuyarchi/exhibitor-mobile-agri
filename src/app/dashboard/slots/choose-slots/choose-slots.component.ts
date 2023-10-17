import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ManageplaneService } from '../../manageplan/manageplane.service';
import { SlotsService } from '../slots.service';
import { ToastrService } from 'ngx-toastr';
declare const $: any;
@Component({
  selector: 'app-choose-slots',
  templateUrl: './choose-slots.component.html',
  styleUrls: ['./choose-slots.component.css']
})
export class ChooseSlotsComponent implements OnInit{
  constructor(
    private service: SlotsService,
    private arouter: ActivatedRoute,
    private planService: ManageplaneService,
    private router:Router,
    private toastr:ToastrService
  ) {}

  ngOnInit(): void {
    this.arouter.queryParams.subscribe((params) => {
      this.id = params["id"];
      this.get_plan();
    });
    console.log(this.id);
  }
  id!: string;
  data: string[] = [];
  dates: any = [];
  selectedDate: any;
  exclusive: any;
  normal: any;
  peak: any;
  dummyarr: any[] = [];
  normalS: any = [];
  peakS: any = [];
  exS: any = [];
  slotsFinal: any = [];
planName!:string;
  constNum(v: number): number {
    const num = v;
    return num;
  }
  get_plan() {
    this.service.get_plan_for_availSlots(this.id).subscribe((res: any) => {
      console.log(res, "plan");
      this.dummyarr = res.slotInfo;
      this.planName=res.planName
      this.dummyarr.forEach((res: any) => {
        if (res.SlotType == "Normal") {
          this.normalS.push(res);
        }
        if (res.SlotType == "Exclusive") {
          this.exS.push(res);
        }
        if (res.SlotType == "Peak") {
          this.peakS.push(res);
        }
      });
      this.normalS.sort((a: any, b: any) => a.Duration - b.Duration);
      this.exS.sort((a: any, b: any) => a.Duration - b.Duration);
      this.peakS.sort((a: any, b: any) => a.Duration - b.Duration);
      console.log("normal", this.normalS, "peak", this.peakS, "ex", this.exS);
      let data = {
        PlanId: this.id,
      };
      this.get_all(data);
    });
  }
  get_all(id: any) {
    this.service.get_all_slots(id).subscribe((res: any) => {
      console.log("response", res);

      res.dates.forEach((res: any) => {
        this.dates.push(new Date(res.date));
      });
      const datePipe = new DatePipe('en-US');

     
      const today = datePipe.transform(this.today, 'yyyy-MM-dd')

      this.dates.sort((a: Date, b: Date) => a.getTime() - b.getTime());
  this.selectedDate=    res.dates.find((res:any)=>{
           console.log( res.date == today,'iji')
         return   res.date == today
  
         }) ? today : this.dates[0]
      // this.selectedDate = res.dates.includes((res:any)=>{
      //   console.log( res.date == today,'iji')
      // return   res.date == today

      // })? today :this.dates[0];

      console.log(this.selectedDate,'selected date',res.dates.includes((res:any)=>{
        return   res.date == today
  
        }),res.dates,today)
      console.log(this.dates,'dates');
      for (let i = 0; i <= res.val.length - 1; i++) {
        console.log(i);

        if (res.val[i]._id == "Exclusive") {
          this.exclusive = res.val[i].documents;
        }
        if (res.val[i]._id == "Peak") {
          this.peak = res.val[i].documents;
        }
        if (res.val[i]._id == "Normal") {
          this.normal = res.val[i].documents;
        }
      }
      if(this.normal){
        this.normal.sort((a: any, b: any) => a.Duration - b.Duration);
      }
      if(this.exclusive){
        this.exclusive.sort((a: any, b: any) => a.Duration - b.Duration);
      }
      if(this.peak){
        this.peak.sort((a: any, b: any) => a.Duration - b.Duration);

      }
    });
  }
  changeSDate(v: any) {
    
    this.selectedDate = v;
    console.log(this.selectedDate,'selected date')
  }
  choose(v: any) {
    let find = this.slotsFinal.findIndex((res: any) => {
      return res.slotId == v._id;
    });
    console.log(find, "find");
    let durationfind = this.normalS.findIndex((res: any) => {
      // console.log(res.Duration , v.Duration)
      return res.Duration == v.Duration;
    });
    if (find == -1) {
      // console.log(durationfind,'duration find')
      if (
        this.normalS[durationfind].Slots !=
        this.normalS[durationfind].selected_count
      ) {
        this.slotsFinal.push({
          Date: this.selectedDate,
          planId: this.id,
          slotId: v._id,
          Type: v.Type,
          duration: v.Duration,
          start: v.start,
          end: v.end,
        });
        if (this.normalS[durationfind].selected_count == undefined) {
          this.normalS[durationfind].selected_count = 0;
        }
        this.normalS[durationfind].selected_count =
          this.normalS[durationfind].selected_count + 1;
      } else {
        console.log("count reached");
      }
    } else {
      this.slotsFinal.splice(find, 1);
      if (this.normalS[durationfind].selected_count > 0) {
        this.normalS[durationfind].selected_count =
          this.normalS[durationfind].selected_count - 1;
      }
    }
    console.log(find);
    console.log(this.slotsFinal);
    console.log(this.normalS, "slot he have");
  }
  chooseP(v: any) {
    let find = this.slotsFinal.findIndex((res: any) => {
      return res.slotId == v._id;
    });
    console.log(find, "find");
    let durationfind = this.peakS.findIndex((res: any) => {
      // console.log(res.Duration , v.Duration)
      return res.Duration == v.Duration;
    });
    if (find == -1) {
      // console.log(durationfind,'duration find')
      if (
        this.peakS[durationfind].Slots !=
        this.peakS[durationfind].selected_count
      ) {
        this.slotsFinal.push({
          Date: this.selectedDate,
          planId: this.id,
          slotId: v._id,
          Type: v.Type,
          duration: v.Duration,
          start: v.start,
          end: v.end,
        });
        if (this.peakS[durationfind].selected_count == undefined) {
          this.peakS[durationfind].selected_count = 0;
        }
        this.peakS[durationfind].selected_count =
          this.peakS[durationfind].selected_count + 1;
      } else {
        console.log("count reached");
      }
    } else {
      this.slotsFinal.splice(find, 1);
      if (this.peakS[durationfind].selected_count > 0) {
        this.peakS[durationfind].selected_count =
          this.peakS[durationfind].selected_count - 1;
      }
    }
    console.log(find);
    console.log(this.slotsFinal);
    console.log(this.peakS, "slot he have");
  }

  chooseEx(v: any) {
    let find = this.slotsFinal.findIndex((res: any) => {
      return res.slotId == v._id;
    });
    console.log(find, "find");
    let durationfind = this.exS.findIndex((res: any) => {
      // console.log(res.Duration , v.Duration)
      return res.Duration == v.Duration;
    });
    if (find == -1) {
      // console.log(durationfind,'duration find')
      if (
        this.exS[durationfind].Slots !=
        this.exS[durationfind].selected_count
      ) {
        this.slotsFinal.push({
          Date: this.selectedDate,
          planId: this.id,
          slotId: v._id,
          Type: v.Type,
          duration: v.Duration,
          start: v.start,
          end: v.end,
        });
        if (this.exS[durationfind].selected_count == undefined) {
          this.exS[durationfind].selected_count = 0;
        }
        this.exS[durationfind].selected_count =
          this.exS[durationfind].selected_count + 1;
      } else {
        console.log("count reached");
      }
    } else {
      this.slotsFinal.splice(find, 1);
      if (this.exS[durationfind].selected_count > 0) {
        this.exS[durationfind].selected_count =
          this.exS[durationfind].selected_count - 1;
      }
    }
    console.log(find);
    console.log(this.slotsFinal);
    console.log(this.exS, "slot he have");
  }
  isActive(id: any): boolean {
    let find = false;
    this.slotsFinal.find((res: any): any => {
      if (res.slotId == id) {
        find = true;
        return true;
      } else {
        find = false;
        return false;
      }
    });
    return find;
  }
  returnIndex(id: any): number {
    let find = this.slotsFinal.findIndex((res: any): any => {
      return id == res.slotId;
    });
    return find;
  }
  showslots: any = [];
  viewslots() {
    let normal =this.normalS.filter((res:any)=>{
      console.log(res,res.hasOwnProperty('selected_count'))
    return  res.hasOwnProperty('selected_count') && res.selected_count == res.Slots
    })
    let peak =this.peakS.filter((res:any)=>{
      console.log(res,res.hasOwnProperty('selected_count'))
    return  res.hasOwnProperty('selected_count') && res.selected_count == res.Slots
    })
    let ex =this.exS.filter((res:any)=>{
      console.log(res,res.hasOwnProperty('selected_count'))
    return  res.hasOwnProperty('selected_count') && res.selected_count == res.Slots
    })

  if(normal.length == this.normalS.length && peak.length == this.peakS.length && ex.length == this.exS.length){
    console.log('slotes are booked')
    let showslots = this.slotsFinal.reduce(
      (entryMap: any, e: any) =>
        entryMap.set(formatDate(e.Date, "yyyy-MM-dd", "en-IN"), [
          ...(entryMap.get(formatDate(e.Date, "yyyy-MM-dd", "en-IN")) || []),
          e,
        ]),
      new Map()
    );
    console.log(showslots)
    let arr:any= [...showslots ].map(([key, value]) => ({key, value}))
    this.showslots=arr;
    console.log(this.showslots)
    $("#exampleModal").modal("show");
  }
  else{
    console.log('please book slot')
    this.toastr.error( 'To Submit','Please Book All slots',{
      timeOut: 5000,
  positionClass: 'toast-top-right',
    });
  }
  }
  today = new Date()
  submit(){
    let data ={
      arr:this.slotsFinal
    }
    this.service.confirmSlot(data).subscribe((res:any)=>
    {
      console.log(res)
      this.router.navigateByUrl('/dashboard/slots')
    })
  }
  showdate(current:any,old:any):boolean{

    const datePipe = new DatePipe('en-US');
const currentDate = datePipe.transform(current, 'yyyy-MM-dd');
const olddate = datePipe.transform(old, 'yyyy-MM-dd');
// console.log(currentDate,olddate)
if (currentDate !== null && olddate !== null) {
  if(currentDate == olddate || currentDate < olddate ){
    return true
  }else{
    return false
  }
}else{
  return false
}
   
 }
  showslot(endTime:any,date:any){
  
  const now = new Date();
const currentHours = now.getHours();
const currentMinutes = now.getMinutes();
const currentSeconds = now.getSeconds();
let time= currentHours+':'+currentMinutes
const datePipe = new DatePipe('en-US');
const today = datePipe.transform(this.today, 'yyyy-MM-dd')
if(date == today){
  if(time< endTime){
    return true
  }
  else{
    return false
  }
}else{
  return true
}
// console.log(time,endTime,time< endTime)
   
}
    sameDate(current:any,selected:any){
      const datePipe = new DatePipe('en-US');
      const currentDate = datePipe.transform(current, 'yyyy-MM-dd');
      const olddate = datePipe.transform(selected, 'yyyy-MM-dd');
      if (currentDate !== null && olddate !== null) {
        if(currentDate == olddate  ){
          return true
        }else{
          return false
        }
      }else{
        return false
      }
    }
}


