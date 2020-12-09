import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  message: string;

  constructor() {
    this.message = 'DashboardComponent message';
  }

  ngOnInit(): void {}
}
