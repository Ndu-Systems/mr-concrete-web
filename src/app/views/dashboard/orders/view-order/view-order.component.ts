import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderView } from 'src/app/_models/orderview.model';
import { ConcreteorderService } from 'src/app/_services/dashboard';
import { AccountService, MeasurementService } from 'src/app/_services';
import { UserModel, Measurement } from 'src/app/_models';
import { Router } from '@angular/router';
import { ConfirmationPageModel } from 'src/app/_shared';

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
  confirmationPageParams: ConfirmationPageModel = {
    heading: 'Supplier orders',
    subheading: 'Order status updated',
    text: 'Thank you for your update, the relevant stakeholders have been notified.',
    positiveNavLabel: 'View order',
    positiveNavLink: 'dashboard/view-order',
    negativeNavLabel: 'Done',
    negativeNavLink: 'dashboard/orders',
    actionLink: 'dashboard/orders',
    actionLabel: 'Return to orders',
    type: 'Order',
    imgUrl: 'assets/images/dashboard/successfully.svg'

  };
  order$: Observable<OrderView>;
  order: OrderView;
  currentUser: UserModel;
  measurements;
  constructor(private concreteorderService: ConcreteorderService,
              private accountService: AccountService,
              private measurementService: MeasurementService,
              private router: Router
  ) { }

  ngOnInit() {
    this.currentUser = this.accountService.CurrentUserValue;
    this.order$ = this.concreteorderService.order;
    this.measurementService.measurements.subscribe(data => {
      this.measurements = data;
    });
    this.measurementService.getMeasurements();
    this.concreteorderService.order.subscribe(data => {
      this.order = data;
    });
    console.log(this.measurements);
  }

  createNewOrder() {
    this.concreteorderService.createOrder(this.order).subscribe(response => {
      this.concreteorderService.resetOrder();
      this.confirmationPageParams.heading = 'Create new order';
      this.confirmationPageParams.subheading = 'New order created';
      this.confirmationPageParams.text = 'Thank you for your new order, the relevant stakeholders have been notified.';
      localStorage.setItem('confirmation', JSON.stringify(this.confirmationPageParams));
      this.router.navigate(['dashboard/outcome']);
    });
  }

  updateOder() {
    this.concreteorderService.updateOrder(this.order).subscribe(response => {
      this.concreteorderService.setStateForCurrentOrder(response);
      localStorage.setItem('confirmation', JSON.stringify(this.confirmationPageParams));
      this.router.navigate(['dashboard/outcome']);
    });
  }
  edit() {
    this.order.isBusyWith = true;
    this.concreteorderService.setStateForCurrentOrder(this.order);
    this.router.navigate(['dashboard/update-order']);

  }
  action() {
    if (this.order.OrderId.length > 5) {
      this.updateOder();
      return true;
    }
    this.createNewOrder();
  }
}
