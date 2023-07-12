import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InitialstockmanagerService } from '../initialstockmanager.service';

@Component({
  selector: 'app-initialstockproduct',
  templateUrl: './initialstockproduct.component.html',
  styleUrls: ['./initialstockproduct.component.css']
})
export class InitialstockproductComponent implements OnInit {
  id: any;
  data: any;

  constructor(
    private service: InitialstockmanagerService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // get Id from QueryParams
    this.route.queryParams.subscribe((params: any) => {
      this.id = params['id'];
      this.fetchData();
    });

  }
  Stream: any;
  fetchData(): void {
    this.service.fetchData(this.id).subscribe((res: any) => {
      this.data = res.values;
      console.log(this.data);
      this.Stream = res.stream;
    });
  }
}
