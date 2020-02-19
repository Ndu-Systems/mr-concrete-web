import { Supplier } from './../../../_models/supplier.model';
import { Component, OnInit } from '@angular/core';
import { ConcreteorderService } from 'src/app/_services/dashboard';
import { AccountService, SupplierService } from 'src/app/_services';
import { UserModel, Placeholder } from 'src/app/_models';
import { OrderView } from 'src/app/_models/orderview.model';
import { Roles } from 'src/app/_shared';
import { StatusEnum } from 'src/app/_shared/status.enum';

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
  placeHolder: Placeholder;
  constructor(
    private orderService: ConcreteorderService,
    private accontService: AccountService,
    private supplierService: SupplierService
  ) { }

  ngOnInit() {
    this.user = this.accontService.CurrentUserValue;
    this.getRecentOrderForSupplier(this.user);
    this.placeHolder = {
      imageUrl: 'assets/images/dashboard/placeholders/empty-cart.svg',
      message: 'There are no orders recently.',
      link: '/dashboard/create-orders',
      linkLabel: 'Create Order'
    };
  }

  getRecentOrderForSupplier(user: UserModel) {
    if (user.Role.RoleName === Roles.SUPPLIER) {
      this.orderService.getOrdersForSupplier(user.UserId).subscribe(result => {
        if (result.Orders) {
          const pendingOrders = result.Orders.filter(x => x.StatusId.toString() === '1').sort((x, y) => {
            return new Date(y.CreateDate).getTime() - new Date(x.CreateDate).getTime();
          });
          // this.recentOrder = new Concreteorder();
          this.recentOrder = pendingOrders[0];

          if (this.recentOrder.StatusId.toString() === '1') {
            this.status = StatusEnum.PENDING_APPROVAL;
          }
          if (this.recentOrder.StatusId.toString() === '2') {
            this.status = StatusEnum.ACCEPTED_AT_SUPPLIER;
          }
          if (this.recentOrder.StatusId.toString() === '3') {
            this.status = StatusEnum.IN_PROGRESS;
          }
          if (this.recentOrder.StatusId.toString() === '4') {
            this.status = StatusEnum.ON_DELIVERY;
          }
          if (this.recentOrder.StatusId.toString() === '5') {
            this.status = StatusEnum.CONFIRMED_BY_CUSTOMER;
          }
          if (this.recentOrder.StatusId.toString() === '6') {
            this.status = StatusEnum.COMPLETE;
          }
          if (this.recentOrder.StatusId.toString() === '7') {
            this.status = StatusEnum.CANCELLED;
          }
        }
      });
    }
  }
}
