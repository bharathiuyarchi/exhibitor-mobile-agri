import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.css']
})
export class ProgressbarComponent {

  @Input("load") load: any = 0
  @Input("type") type: any = 0
  @Output() newItemEvent = new EventEmitter<boolean>(false);

  types: any = ["Downloading", "Uploading"]
  cancel_download() {
    this.newItemEvent.emit(true);
  }
}
