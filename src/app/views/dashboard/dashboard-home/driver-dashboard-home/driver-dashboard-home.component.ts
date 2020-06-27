import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-driver-dashboard-home',
  templateUrl: './driver-dashboard-home.component.html',
  styleUrls: ['../dashboard-home.component.scss']
})
export class DriverDashboardHomeComponent implements OnInit {
  heading = 'Your order deliveries';
  subheading = 'A list of deliveries assigned to you';
  actionButton: any = {
    link: '/dashboard/deliveries',
    label: 'View all deliveries'
  };
  today: Date;
  constructor() { }

  ngOnInit() {
  }

}
