import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss']
})
export class ViewOrderComponent implements OnInit {
  heading = 'Orders';
  subheading = 'View order';
  actionButton: any = {
    link: '/dashboard/orders',
    label: 'Return to orders'
  };
  constructor() { }

  ngOnInit() {
  }

}
