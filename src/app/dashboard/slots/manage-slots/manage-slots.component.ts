import { Component, OnInit } from '@angular/core';
import { SlotsService } from '../slots.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-slots',
  templateUrl: './manage-slots.component.html',
  styleUrls: ['./manage-slots.component.css']
})
export class ManageSlotsComponent implements OnInit {
  constructor(private service:SlotsService,private router:Router){}

  data:any=[]
  ngOnInit(): void {
    this.get_all()
  }
  get_all(){
    this.service.get_plan_for_slot().subscribe((res:any)=>{
      this.data=res
      console.log(res)
    })
  }
  chooseSlot(id:any){
    let data={
      id:id
    }
    console.log(data)
    let query = new URLSearchParams(data).toString()
    this.router.navigateByUrl('/dashboard/slots/choose-slots?' + query)
  }
  view(id:any){
    let data={
      id:id
    }
    console.log(data)
    let query = new URLSearchParams(data).toString()
    this.router.navigateByUrl('/dashboard/slots/view-slots?' + query)
  }
  checkbutton(v:any){
    if( (v.Normal == v.NormalSlots) && (v.Peak == v.PeakSlots) && (v.Exclusive== v.ExclusiveSlots)){
      return true;
    }
    else{
      return false;
    }
  }
}
