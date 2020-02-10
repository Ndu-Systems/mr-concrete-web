import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderView } from 'src/app/_models/orderview.model';
import { ConcreteorderService } from 'src/app/_services/dashboard';
import { AccountService, MeasurementService } from 'src/app/_services';
import { UserModel } from 'src/app/_models';

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

  order$: Observable<OrderView>;
  currentUser: UserModel;
  measurements;
  constructor(private concreteorderService: ConcreteorderService,
    private accountService: AccountService,
    private measurementService: MeasurementService,

  ) { }

  ngOnInit() {
    this.currentUser = this.accountService.CurrentUserValue;
    this.order$ = this.concreteorderService.order;
    this.measurementService.measurements.subscribe(data => {
      this.measurements = data;
    })
  }

}
