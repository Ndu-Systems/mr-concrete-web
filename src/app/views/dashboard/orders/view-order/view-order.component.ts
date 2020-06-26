import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { OrderView } from 'src/app/_models/orderview.model';
import { ConcreteorderService } from 'src/app/_services/dashboard';
import { AccountService, MeasurementService, DeliveryService } from 'src/app/_services';
import { UserModel, Measurement, DeliveryModel, Placeholder, DeliveryQueryModel } from 'src/app/_models';
import { Router } from '@angular/router';
import { ConfirmationPageModel } from 'src/app/_shared';
import { OrderService } from 'src/app/_services/dashboard/order.service';
import { Order } from 'src/app/_models/order.model';
import { takeUntil } from 'rxjs/operators';
import { SUPPLIER_ROLE, ADMIN_ROLE } from '../../shared';

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
  placeHolder: Placeholder = {
    imageUrl: 'assets/images/dashboard/placeholders/default.svg',
    message: 'No deliveries found.'
  };
  showModal: boolean;
  deliveries: DeliveryModel[] = [];
  private onDestroy$ = new Subject<boolean>();

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
  order: Order;
  currentUser: UserModel;
  measurements;
  constructor(
    private orderService: OrderService,
    private accountService: AccountService,
    private deliveryService: DeliveryService,
    private measurementService: MeasurementService,
    private router: Router
  ) { }

  ngOnInit() {
    this.currentUser = this.accountService.CurrentUserValue;
    this.order$ = this.orderService.viewOrdeObservable;
    this.order = this.orderService.getCurrentOrder();
    this.getDeliveries();
  }


  getDeliveries() {
    if (this.currentUser.Roles.RoleName === ADMIN_ROLE.typeOfUser ||
      this.currentUser.Roles.RoleName === SUPPLIER_ROLE.typeOfUser
    ) {
      const query: DeliveryQueryModel = { CompanyId: this.currentUser.CompanyId, IsDeleted: false, StatusId: '1' };
      this.deliveryService.getCompanyDeliveries(query);
      this.deliveryService.deliveries.pipe(takeUntil(this.onDestroy$)).subscribe(data => {
        if (data) {
          this.deliveries = data.filter(o => o.OrderId === this.order.OrderId);
        }
      });
    }
  }

}
