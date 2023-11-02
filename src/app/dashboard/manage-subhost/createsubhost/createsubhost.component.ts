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
      if (this.id != null) {
        this.get_userDetails(this.id)
      }
    })
  }
  createsubhost = new FormGroup({
    contactName: new FormControl(null, [Validators.required]),
    mobileNumber: new FormControl(null, [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    sellerRole: new FormControl(null, [Validators.required])
  })
  error_message: any;
  submited: boolean = false;

  get controls() {
    return this.createsubhost.controls;
  }
  submit_subhost() {
    console.log(this.createsubhost.value)
    this.submited = true;
    this.error_message = null;

    if (this.createsubhost.valid) {
      this.submited = false;
      if (this.id == null) {
        this.api.create_subhost(this.createsubhost.value).subscribe((res: any) => {
          console.log(res)
          this.router.navigateByUrl('/dashboard/subhost')
        }, error => {
          this.error_message = error.error.message
        })
      }
      else {
        this.api.update_single_user(this.id, this.createsubhost.value).subscribe((res: any) => {
          console.log(res)
          this.router.navigateByUrl('/dashboard/subhost')
        }, error => {
          this.error_message = error.error.message
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
