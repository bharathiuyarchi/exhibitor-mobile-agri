import { Component } from '@angular/core';

@Component({
  selector: 'app-postapprove',
  templateUrl: './postapprove.component.html',
  styleUrls: ['./postapprove.component.css']
})
export class PostapproveComponent {

  findsort = false;

  sort() {
    this.findsort = !this.findsort;
  }


  sortselect: any;
  selectsort(a: any) {
    this.sortselect = a;
    this.findsort = !this.findsort;

  }

  submitBtn = false;

  selectfieldDropdown = false;

  showSelectDropdown() {
    this.selectfieldDropdown = !this.selectfieldDropdown;
  }

  dropdownselect: any;
  selectDropdown(v: any) {
    this.dropdownselect = v;
    this.selectfieldDropdown = this.selectfieldDropdown;
    this.submitBtn = true;

  }


  showPopup = -1

  show(index: number) {
    this.showPopup = index;
  }
  close() {
    this.showPopup = -1
  }

}
