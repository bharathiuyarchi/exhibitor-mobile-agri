import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ManagesubhostService } from '../managesubhost.service';

@Component({
  selector: 'app-createsubhost',
  templateUrl: './createsubhost.component.html',
  styleUrls: ['./createsubhost.component.css']
})
export class CreatesubhostComponent implements OnInit {

  ngOnInit(): void {

  }
  id: any;
  constructor(public api: ManagesubhostService, public router: Router, private route: ActivatedRoute) {
    this.route.queryParamMap.subscribe((res: any) => {
      this.id = res.params.id;
      this.get_userDetails(this.id)
    })
  }
  createsubhost = new FormGroup({
    contactName: new FormControl(null, [Validators.required]),
    mobileNumber: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required]),
    sellerRole: new FormControl(null, [Validators.required])
  })
  submit_subhost() {
    console.log(this.createsubhost.value)

    if (this.createsubhost.valid) {
      if (this.id == null) {
        this.api.create_subhost(this.createsubhost.value).subscribe((res: any) => {
          console.log(res)
          this.router.navigateByUrl('/dashboard/subhost')
        })
      }
      else {
        this.api.update_single_user(this.id, this.createsubhost.value).subscribe((res: any) => {
          console.log(res)
          this.router.navigateByUrl('/dashboard/subhost')
        })
      }
    }
  }

  get_userDetails(id: any) {
    this.api.get_single_user(id).subscribe((res: any) => {
      console.log(res)
      this.createsubhost.patchValue({
        contactName: res.contactName,
        mobileNumber: res.mobileNumber,
        email: res.email,
        sellerRole: res.sellerRole[0],
      })
    })
  }


}
