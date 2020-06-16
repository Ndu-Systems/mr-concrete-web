import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/_models/order.model';
import { OrderService } from 'src/app/_services/dashboard/order.service';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_services';
import { UserModel } from 'src/app/_models';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.scss']
})
export class CartViewComponent implements OnInit {
  order$: Observable<Order>;
  currentUser: UserModel;
  constructor(
    private orderService: OrderService,
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit() {
    this.currentUser = this.accountService.CurrentUserValue;
    this.order$ = this.orderService.orderObservable;
    this.orderService.orderObservable.subscribe(order => {
      if (!order) {
        this.orderService.initOrderState();
      }
    });
  }

  showCart(order: Order) {
    order.ShowCart = true;
    this.orderService.setOrderState(order);
    this.router.navigate(['/dashboard/create-orders']);

    if (this.currentUser.Roles.RoleName === 'Customer') {
      this.router.navigate(['/dashboard/create-customer-order']);
    } else {
      this.router.navigate(['/dashboard/create-orders']);
    }
  }

}
