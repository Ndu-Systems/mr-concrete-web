import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/_models/order.model';
import { OrderService } from 'src/app/_services/dashboard/order.service';
import { Router } from '@angular/router';
import { Orderproduct } from 'src/app/_models/orderproduct .model';

@Component({
  selector: 'app-cart-detailed',
  templateUrl: './cart-detailed.component.html',
  styleUrls: ['./cart-detailed.component.scss']
})
export class CartDetailedComponent implements OnInit {

  order$: Observable<Order>;
  order: Order;
  constructor(private orderService: OrderService, private router: Router) { }

  ngOnInit() {
    this.order$ = this.orderService.orderObservable;
    this.orderService.orderObservable.subscribe(order => {
      if (!order) {
        this.orderService.initOrderState();
      } else {
        this.order = order;
      }
    });
  }


  removeItem(item: Orderproduct, index: number) {
    console.log(item);
    this.order.Total -= (Number(item.Quantity) * Number(item.Price));
    this.order.Orderproducts.splice(index, 1);
    if (this.order.Orderproducts.length === 0) {
      this.order.Total = 0;
    }
    this.orderService.setOrderState(this.order);
  }
  adjustItem(item: Orderproduct, index: number, action: number) {
    console.log(item);
    if (action === -1 && item.Quantity <= 1) {
      return false;
    }
    item.Quantity += action;
    // this.order.Total -= (Number(item.Quantity) * Number(item.Price));
    this.order = this.orderService.calculateTotal(this.order);
    this.orderService.setOrderState(this.order);
  }

}
