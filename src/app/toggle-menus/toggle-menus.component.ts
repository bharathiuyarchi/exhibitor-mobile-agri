import { ClobelObservables } from 'src/app/clobelObservable.service';
import { Component } from '@angular/core';

@Component({
  selector: 'toggle-menu',
  templateUrl: './toggle-menus.component.html',
  styleUrls: ['./toggle-menus.component.css']
})
export class ToggleMenusComponent {
  constructor(private obj: ClobelObservables) {

  }
  open_menu() {
    this.obj.hideSidebar.next(true)
  }
}
