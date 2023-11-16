import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  ngOnInit(): void {
  }
  constructor(private router: Router) { }
  routeto() {
    this.router.navigateByUrl('/dashboard/plan/plans')
  }
}
