import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderView } from 'src/app/_models/orderview.model';
import { UserModel } from 'src/app/_models';
import { ConcreteorderService } from 'src/app/_services/dashboard';
import { AccountService, MeasurementService } from 'src/app/_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-outcome',
  templateUrl: './outcome.component.html',
  styleUrls: ['./outcome.component.scss']
})
export class OutcomeComponent implements OnInit {

  heading = 'Orders';
  subheading = 'View order';
  actionButton: any = {
    link: '/dashboard/orders',
    label: 'Return to orders'
  };

  order$: Observable<OrderView>;
  order: OrderView;
  currentUser: UserModel;
  measurements;
  constructor(private concreteorderService: ConcreteorderService,
    private accountService: AccountService,
    private measurementService: MeasurementService,
    private router: Router,


  ) { }

  ngOnInit() {
    this.currentUser = this.accountService.CurrentUserValue;
    this.order$ = this.concreteorderService.order;
    this.measurementService.measurements.subscribe(data => {
      this.measurements = data;
    });
    this.concreteorderService.order.subscribe(data => {
      this.order = data;
    });
  }

  preview() {
    this.concreteorderService.setStateForCurrentOrder(this.order);
    this.router.navigate(['dashboard/view-order']);
  }
  list() {
    this.concreteorderService.setStateForCurrentOrder(this.order);
    this.router.navigate(['dashboard/orders']);
  }
}
