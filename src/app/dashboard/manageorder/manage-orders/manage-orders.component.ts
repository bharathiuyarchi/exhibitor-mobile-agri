import { Component, OnInit } from "@angular/core";
import { ManageplaneService } from "../../manageplan/manageplane.service";

@Component({
  selector: "app-manage-orders",
  templateUrl: "./manage-orders.component.html",
  styleUrls: ["./manage-orders.component.css"],
})
export class ManageOrdersComponent implements OnInit {
  streamDetails: any;

  constructor(private API: ManageplaneService) {}

  ngOnInit(): void {
    this.fetchStreamDetails();
  }

  fetchStreamDetails() {
    this.API.StreamDetails().subscribe((e: any) => {
      this.streamDetails = e;
      console.log(this.streamDetails);
    });
  }
}
