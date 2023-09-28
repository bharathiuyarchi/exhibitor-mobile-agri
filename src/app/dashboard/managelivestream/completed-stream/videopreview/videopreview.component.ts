import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-videopreview',
  templateUrl: './videopreview.component.html',
  styleUrls: ['./videopreview.component.css']
})
export class VideopreviewComponent implements OnInit {
  @Input('data') videolink: any;
  constructor() { }

  ngOnInit(): void {
  }
}
