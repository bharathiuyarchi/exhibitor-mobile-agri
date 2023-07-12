import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Env } from 'src/app/environment';
import { ManagepostService } from '../managepost.service';
import { Meta } from '@angular/platform-browser';
const navigator = window.navigator as any;

@Component({
  selector: 'app-managepost',
  templateUrl: './managepost.component.html',
  styleUrls: ['./managepost.component.css']
})
export class ManagepostComponent implements OnInit {

  constructor(public api: ManagepostService, private meta: Meta) { }
  baseURL = Env.baseAPi;

  ngOnInit(): void {
    this.iso = new Date().getTime()
    this.get_all_posts(this.filterForm.value);
    let date = new Date('2023-04-17 23:59:59').getTime()
    console.log(date)
    console.log(formatDate(date, 'hh:mm a', 'en-IN'))

    this.meta.addTag({
      name: 'og:locale',
      content: 'en_US'
    });
    this.meta.addTag({
      name: 'og:site_name',
      content: 'Warmy'
    });
    this.meta.addTag({
      name: 'og:type',
      content: 'website'
    });
    this.meta.addTag({
      name: 'og:title',
      content: 'Warmy - Professional IT services & solutions company'
    });
    this.meta.addTag({
      name: 'og:image:secure_url',
      content: 'https://warmy.co.in/wp-content/uploads/2023/06/Warmy.png'
    });
    this.meta.addTag({
      name: 'og:description',
      content: 'Warmy elevate your online presence with premier IT services & solutions. Specializing in UX/UI design, web development, m-commerce, and e-commerce solutions.'
    });
    this.meta.addTag({
      name: 'og:url',
      content: 'https://warmy.co.in/'
    });
    this.meta.addTag({
      name: 'og:image',
      content: 'https://warmy.co.in/wp-content/uploads/2023/06/Warmy.png'
    });

    

  }
  iso: any;

  filterForm: any = new FormGroup({
    date: new FormControl(null),
    status: new FormControl('all'),
    page: new FormControl(0),
  })
  filterDate = new FormControl(null)

  apply_filter() {
    console.log(this.filterDate.value, 12312312)
    if (this.filterDate?.value != null) {
      let endDate = formatDate(new Date().setDate(new Date(this.filterDate?.value['end']['$d']).getDate() - 1), 'yyy-MM-dd', 'en-IN');
      let startDate = formatDate(new Date(this.filterDate?.value['start']['$d']), 'yyyy-MM-dd', 'en-IN');
      console.log(endDate)
      console.log(startDate)
      this.filterForm.get("date")?.setValue(startDate + "," + endDate)
    }
    else {
      this.filterForm.get("date")?.setValue(null)
    }
    this.get_all_posts(this.filterForm.value);
    console.log(this.filterForm.value)
  }
  my_posts: any;
  page: any = 0;
  next: any = false;
  get_all_posts(page: any) {
    this.filterForm.get('page').setValue(this.page)
    this.api.get_all_post(this.filterForm.value).subscribe((res: any) => {
      console.log(res)
      if (res != null) {
        this.my_posts = res.value;
        this.next = res.next;
      }
    })
  }

  pagination(type: any) {

    console.log(type)
    if (type == 'prev') {
      this.page--;
    }
    if (type == 'next') {
      this.page++;
    }
    this.get_all_posts(this.filterForm.value);
  }
  delete_post(id: any) {
    this.api.delete_one_post(id).subscribe((res: any) => {
      this.get_all_posts(this.filterForm.value);
    });
  }
  remove_post({ _id }: any) {
    this.api.removed_one_post(_id).subscribe((res: any) => {
      this.get_all_posts(this.filterForm.value);
    });
  }

  view_details: any;
  view_details_type: any;
  view_image(type: any, item: any) {
    console.log(type, item)
    this.view_details = item;
    this.view_details_type = type;
  }
  close_popup() {
    this.view_details = null;
  }
  view_details_type_action(type: any) {
    this.view_details_type = type;
  }

}
