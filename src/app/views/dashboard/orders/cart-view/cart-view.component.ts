import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/_models/order.model';
import { OrderService } from 'src/app/_services/dashboard/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.scss']
})
export class CartViewComponent implements OnInit {
  order$: Observable<Order>;
  constructor(private orderService: OrderService, private router: Router) { }

  ngOnInit() {
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
  }

}
