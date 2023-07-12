import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-commen',
  templateUrl: './commen.component.html',
  styleUrls: ['./commen.component.css']
})
export class CommenComponent implements OnInit {
  @Input('show') show: any;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    console.log(this.show, 13212312312312)

  }
}
