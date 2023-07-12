import { Router } from '@angular/router';
import { AuthcheckService } from 'src/app/authcheck.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { MyprofileService } from '../myprofile.service';

@Component({
  selector: 'app-editprofiles',
  templateUrl: './editprofiles.component.html',
  styleUrls: ['./editprofiles.component.css']
})
export class EditprofilesComponent_sub implements OnInit {


  constructor(private api: MyprofileService, private authcheck: AuthcheckService, private router: Router) {
    console.log("cons")

  }
  ngOnInit(): void {
    console.log("on")
    this.getshopTypes()
    this.authcheck.userDetails.subscribe((res: any) => {
      console.log(res, 1231224323242331)
      this.mydetails.patchValue({
        email: res.email,
        contactName: res.contactName,
      })
    })

  }
  shopTypes: any;

  getshopTypes() {
    this.api.get_shop_types().subscribe((res: any) => {
      console.log(res)
      this.shopTypes = res;
    })
  }

  mydetails: any = new FormGroup({
    email: new FormControl(null,),
    contactName: new FormControl(null, [Validators.required]),

  })
  update_now() {
    console.log(this.mydetails.valid)
    if (this.mydetails.valid) {
      this.api.update_profile(this.mydetails.value).subscribe((res: any) => {
        window.history.back()
      })
    }
  }
}
