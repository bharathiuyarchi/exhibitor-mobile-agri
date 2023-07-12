import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ManagesubuserService } from '../managesubuser.service';

@Component({
  selector: 'app-createsubuser',
  templateUrl: './createsubuser.component.html',
  styleUrls: ['./createsubuser.component.css']
})
export class CreatesubuserComponent implements OnInit {

  id: any;
  ngOnInit(): void {

  }
  constructor(public api: ManagesubuserService, public router: Router, private route: ActivatedRoute) {
    this.route.queryParamMap.subscribe((res: any) => {
      this.id = res.params.id;
      this.get_userDetails(this.id)
    })
  }
  createsubuser: any = new FormGroup({
    contactName: new FormControl(null, [Validators.required]),
    mobileNumber: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required]),
    sellerRole: new FormControl([], [Validators.required])
  })

  get_userDetails(id: any) {
    this.api.get_single_user(id).subscribe((res: any) => {
      console.log(res)
      this.createsubuser.patchValue({
        contactName: res.contactName,
        mobileNumber: res.mobileNumber,
        email: res.email,
        sellerRole: res.sellerRole,
      })
    })
  }

  is_checked(val: any) {
    let array: any = this.createsubuser.get('sellerRole').value;
    let index = array.indexOf(val)
    if (index != -1) {
      return true;
    }
    else {
      return false;
    }
  }
  submit_subhost() {
    console.log(this.createsubuser.value)

    if (this.createsubuser.valid) {
      if (this.id == null) {
        this.api.create_subuser(this.createsubuser.value).subscribe((res: any) => {
          console.log(res)
          this.router.navigateByUrl('/dashboard/subuser')
        })
      }
      else {
        this.api.update_single_user(this.id, this.createsubuser.value).subscribe((res: any) => {
          console.log(res)
          this.router.navigateByUrl('/dashboard/subuser')
        })
      }
    }
  }
  sellerRole(event: any) {

    if (event.target.checked) {
      let val: any = event.target.value;
      let array: any = this.createsubuser.get('sellerRole')?.value;
      array.push(val)
      this.createsubuser.get('sellerRole')?.setValue(array);
    }
    else {
      let val: any = event.target.value;
      let array: any = this.createsubuser.get('sellerRole')?.value;
      let index = array.indexOf(val);
      array.splice(index, 1)
      this.createsubuser.get('sellerRole')?.setValue(array);

    }
  }
}
