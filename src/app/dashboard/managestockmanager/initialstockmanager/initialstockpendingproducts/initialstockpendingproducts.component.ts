import { Component, Pipe, PipeTransform } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { InitialstockmanagerService } from '../initialstockmanager.service';

@Component({
  selector: 'app-initialstockpendingproducts',
  templateUrl: './initialstockpendingproducts.component.html',
  styleUrls: ['./initialstockpendingproducts.component.css']
})
export class InitialstockpendingproductsComponent {
  id: any;
  ordered: any;
  confirmed: any;
  cancelled: any;
  denied: any;
  selectedData: any = [];
  filters: any = { name: '', status: '' };
  page = 0;
  constructor(
    private productService: InitialstockmanagerService,
    private Aroute: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.Aroute.queryParams.subscribe((params: any) => {
      this.id = params['id'];
      this.getPendingProducts();

    });
  }

  ResData: any = this.fb.group({
    products: this.fb.array([], Validators.required),
  });

  get push_controls() {
    return this.ResData.controls['products'] as FormArray;
  }
  checked_all(event: any) {
    let checked = event.target.checked;
    if (!checked) {
      checked = null;
    }
    this.push_controls.controls.forEach((a: any) => {
      if (a.value.approvalStatus == 'Pending') {
        a.patchValue({
          checked: checked,
        });
        let index = this.selectedData.indexOf(a.value._id);
        if (index == -1) {
          this.selectedData.push(a.value._id);
        }
      }
    });
    if (checked == null) {
      this.selectedData = [];
    }
  }
  checked_one(val: any, event: any) {
    let checked = event.target.checked;
    let index = this.selectedData.indexOf(val.value._id);
    if (!checked) {
      checked = null;
      if (index != -1) {
        this.selectedData.splice(index, 1);
      }
    } else {
      this.selectedData.push(val.value._id);
    }
    val.patchValue({
      checked: checked,
    });
  }
  Stream: any;
  getPendingProducts() {
    this.productService.getPendingProducts(this.id, this.page, this.filters).subscribe((res: any) => {
      this.Stream = res.streamdetails
      res.values.forEach((a: any) => {
        let vali: any = [];
        if (a.approvalStatus == 'Pending') {
          vali = Validators.required;
        }
        let data: any = this.fb.group({
          approvalStatus: new FormControl(a.approvalStatus),
          checkout: new FormControl(a.checkout),
          name: new FormControl(a.name),
          orderedKg: new FormControl(a.orderedKg),
          productName: new FormControl(a.productName),
          streamEndTime: new FormControl(a.streamEndTime),
          streamingDate: new FormControl(a.streamingDate),
          streamingName: new FormControl(a.streamingName),
          streamingStart: new FormControl(a.streamingStart),
          orderId: new FormControl(a.orderId),
          _id: new FormControl(a._id),
          checked: new FormControl(null, vali),
        });
        this.push_controls.push(data);
      });
      // this.data = res.values;
      this.ordered = res.orderedKg;
      this.confirmed = res.confirmedKg;
      this.cancelled = res.cancelledKg;
      this.denied = res.deniedKg;
    });
  }

  findsort = false;

  sort() {
    this.findsort = !this.findsort;
  }

  update(id: any, status: any) {
    this.push_controls.controls = [];
    return this.productService.update(id, status).subscribe((e: any) => {
      this.getPendingProducts();
    });
  }

  MultipleUpdate(status: any) {
    this.push_controls.controls = [];
    return this.productService
      .MultipleUpdate(this.selectedData, status)
      .subscribe((e: any) => {
        this.getPendingProducts();
      });
  }
  sortselect: any;
  selectsort(a: any) {
    this.sortselect = a;
    this.findsort = !this.findsort;
    console.log(this.sortselect);
    this.filters.status = a;
    this.push_controls.controls = [];
    this.getPendingProducts();
  }

  submitBtn = false;
  Searchevent(e: any) {
    console.log(e.target.value);
    this.filters.name = e.target.value;
    this.push_controls.controls = [];
    this.getPendingProducts();
  }

  next: any = false;
  pagination(type: any) {

    console.log(type)
    if (type == 'prev') {
      this.page--;
    }
    if (type == 'next') {
      this.page++;
    }
    this.getPendingProducts();
  }
}




@Pipe({ name: 'timeDefrences' })
export class Timedefrence implements PipeTransform {
  transform(value: any) {
    // console.log(value);
    var startTime = new Date(value.streamingStart);
    var endTime = new Date(value.checkout);
    var difference = endTime.getTime() - startTime.getTime(); // This will give difference in milliseconds
    var resultInMinutes = Math.round(difference / 60000);
    var sb = '';

    let day = resultInMinutes / 1440;
    let rem = resultInMinutes % 1440;
    let hour = rem / 60;
    let Minute = rem % 60;
    if (Math.round(day) > 0) {
      sb += Math.round(day) + ' day ';
    }

    if (Math.round(hour) > 0) {
      sb += Math.round(hour) + ' hour ';
    }

    if (Math.round(Minute) > 0) {
      sb += Math.round(Minute) + ' Minute ';
    }
    return sb;
  }
}