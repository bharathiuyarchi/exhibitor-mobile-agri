import { Component } from '@angular/core';

@Component({
  selector: 'app-managepoststock',
  templateUrl: './managepoststock.component.html',
  styleUrls: ['./managepoststock.component.css']
})
export class ManagepoststockComponent {
  showPopup = -1;

  show(index: number) {
    this.showPopup = index;
  }
  close() {
    this.showPopup = -1;
  }
}
