import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderView } from 'src/app/_models/orderview.model';
import { ConcreteorderService } from 'src/app/_services/dashboard';
import { AccountService, MeasurementService } from 'src/app/_services';
import { UserModel, Measurement } from 'src/app/_models';
import { Router } from '@angular/router';
import { ConfirmationPageModel } from 'src/app/_shared';
import { OrderService } from 'src/app/_services/dashboard/order.service';
import { Order } from 'src/app/_models/order.model';

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
  order$: Observable<Order>;
  order: OrderView;
  currentUser: UserModel;
  measurements;
  constructor(
    private orderService: OrderService,
    private accountService: AccountService,
    private measurementService: MeasurementService,
    private router: Router
  ) { }

  ngOnInit() {
    this.currentUser = this.accountService.CurrentUserValue;
    this.order$ = this.orderService.orderObservable;
  }
}
