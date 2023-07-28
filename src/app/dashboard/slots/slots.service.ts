import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Env } from 'src/app/environment';

@Injectable({
  providedIn: 'root'
})
export class SlotsService {
  baseapi:string=Env.baseAPi
  constructor(private http:HttpClient) { }

  get_all_slots(data:any){
    return this.http.post(this.baseapi+'/v1/slot/getDetails/slots',data)
  }
  get_plan_for_slot(){
    return this.http.get(this.baseapi+'/v1/purchaseplan/get/PlanDetails/ByUser')
  }
  confirmSlot(data:any){
    return this.http.post(this.baseapi+'/v1/slotbooking',data)
  }
  get_plan_for_availSlots(id:any){
    return this.http.get(this.baseapi+'/v1/purchaseplan/user/Available/Planes/'+id)
  }
  view_slots(id:any){
    return this.http.get(this.baseapi+'/v1/slotbooking/slots/'+id)
  }
}
