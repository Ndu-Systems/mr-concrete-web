import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderView } from 'src/app/_models/orderview.model';
import { UserModel, SupplierOrdersModel, Placeholder, Supplier } from 'src/app/_models';
import { AccountService } from 'src/app/_services';
import { Router } from '@angular/router';
import { ConfirmationPageModel } from 'src/app/_shared';
import { OrderService } from 'src/app/_services/dashboard/order.service';
import { Order } from 'src/app/_models/order.model';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.scss']
})
export class ListOrdersComponent implements OnInit {

  heading = 'Orders';
  subheading = 'A list of orders in the system.';
  orders$: Observable<Order[]>;
  isSupplier: boolean;
  isAdmin: boolean;
  isEngineer: boolean;
  supplierOrder: SupplierOrdersModel;
  supplier: Supplier;

  placeHolder: Placeholder = {
    imageUrl: 'assets/images/dashboard/placeholders/orders.svg',
    message: 'No orders found in our system.',
    link: '/dashboard/create-orders',
    linkLabel: 'Create new order'
  };

  actionButton: any = {
    link: '/dashboard/create-orders',
    label: 'Create Order'
  };

  currentUser: UserModel;
  constructor(
    private accountService: AccountService,
    private router: Router,
    private orderService: OrderService,

  ) { }

  ngOnInit() {
    this.currentUser = this.accountService.CurrentUserValue;
    this.orders$ = this.orderService.ordersObservable;

    localStorage.removeItem('confirmation');
    if (this.currentUser.Roles.RoleName === 'Customer') {
      this.actionButton = {
        link: '/dashboard/create-customer-order',
        label: 'Create Order'
      };
      this.orderService.getCustomerByUserId(this.currentUser.UserId);
    } else {
      this.orderService.getOrderByUserId(this.currentUser.CompanyId);
    }
  }

  more(order: Order) {
    this.orderService.setViewOrderState(order);
    this.router.navigate(['dashboard/view-order']);
  }
  add() { }
}
