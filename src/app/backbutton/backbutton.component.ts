import { Component } from '@angular/core';

@Component({
  selector: 'backbutton',
  templateUrl: './backbutton.component.html',
  styleUrls: ['./backbutton.component.css']
})
export class BackbuttonComponent {
  back_button() {
    window.history.back()
  }
}
