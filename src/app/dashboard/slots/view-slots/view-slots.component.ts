import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SlotsService } from '../slots.service';

@Component({
  selector: 'app-view-slots',
  templateUrl: './view-slots.component.html',
  styleUrls: ['./view-slots.component.css']
})
export class ViewSlotsComponent implements OnInit {
  constructor(private service: SlotsService,private router: Router ,private arouter:ActivatedRoute) {}
  
  id:any;
  data:any[]=[]
  ngOnInit(): void {
    this.arouter.queryParams.subscribe((params)=>{
      this.id=params['id']
    })
    this.get()
  }
  get(){
    this.service.view_slots(this.id).subscribe((res:any)=>{
      console.log("response", res);
      this.data=res
    })
  }
}
