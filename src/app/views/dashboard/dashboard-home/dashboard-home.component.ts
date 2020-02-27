import { Supplier } from './../../../_models/supplier.model';
import { Component, OnInit } from '@angular/core';
import { ConcreteorderService, CounterService } from 'src/app/_services/dashboard';
import { AccountService, SupplierService } from 'src/app/_services';
import { UserModel, Placeholder, CounterModel } from 'src/app/_models';
import { OrderView } from 'src/app/_models/orderview.model';
import { Roles, ConfirmationPageModel } from 'src/app/_shared';
import { StatusEnum } from 'src/app/_shared/status.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent implements OnInit {
  order: OrderView;
  user: UserModel;
  supplier: Supplier;
  orders: OrderView[] = [];
  recentOrder: OrderView;
  status: string;
  toStatusId: number;
  counter: CounterModel;

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
    type: 'Order'
  };

  placeHolder: Placeholder = {
    imageUrl: 'assets/images/dashboard/placeholders/no-order.svg',
    message: 'There are no orders recently',
    link: '/dashboard/orders',
    linkLabel: 'View Orders'
  };

  constructor(
    private concreteorderService: ConcreteorderService,
    private accontService: AccountService,
    private counterService: CounterService,
    private supplierService: SupplierService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = this.accontService.CurrentUserValue;
    this.getRecentOrderForSupplier(this.user);
    this.counterService.getCounters();
    this.counterService.counterModel.subscribe(data => {
      if (data) {
        this.counter = data;
      }
    });
  }

  getRecentOrderForSupplier(user: UserModel) {
    if (user.Role.RoleName === Roles.SUPPLIER) {
      this.supplierService.getSupplier(this.user.Email).subscribe(data => {
        this.supplier = data;
        this.concreteorderService.getOrdersForSupplier(this.supplier.SupplierId).subscribe(result => {
          if (result) {
            const pendingOrders = result.filter(x => x.StatusId.toString() === '1').sort((x, y) => {
              return new Date(y.CreateDate).getTime() - new Date(x.CreateDate).getTime();
            });
            // this.recentOrder = new Concreteorder();
            this.recentOrder = pendingOrders[0];
            if (this.recentOrder.StatusId.toString() === '1') {
              this.status = StatusEnum.PENDING_APPROVAL;
              this.toStatusId = 2;
            }
            if (this.recentOrder.StatusId.toString() === '2') {
              this.status = StatusEnum.ACCEPTED_AT_SUPPLIER;
              this.toStatusId = 3;

            }
            if (this.recentOrder.StatusId.toString() === '3') {
              this.status = StatusEnum.IN_PROGRESS;
              this.toStatusId = 4;

            }
            if (this.recentOrder.StatusId.toString() === '4') {
              this.status = StatusEnum.ON_DELIVERY;
              this.toStatusId = 5;
            }
            if (this.recentOrder.StatusId.toString() === '5') {
              this.status = StatusEnum.CONFIRMED_BY_CUSTOMER;
              this.toStatusId = 6;
            }
            if (this.recentOrder.StatusId.toString() === '6') {
              this.status = StatusEnum.COMPLETE;
            }
            if (this.recentOrder.StatusId.toString() === '7') {
              this.status = StatusEnum.CANCELLED;
            }
          }
        });
      });

    }
  }

  updateOrderStatus(item: OrderView, statusId: number) {
    item.StatusId = statusId;
    this.concreteorderService.updateOrder(item).subscribe(response => {
      this.concreteorderService.setStateForCurrentOrder(response);
      localStorage.setItem('confirmation', JSON.stringify(this.confirmationPageParams));
      this.router.navigate(['dashboard/outcome']);
    });
  }
}
