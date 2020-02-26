import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderView } from 'src/app/_models/orderview.model';
import { ConcreteorderService } from 'src/app/_services/dashboard';
import { AccountService, MeasurementService } from 'src/app/_services';
import { UserModel } from 'src/app/_models';
import { Router } from '@angular/router';

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
    this.concreteorderService.order.subscribe(data => {
      this.order = data;
    });

  }

  createNewOrder() {
    this.concreteorderService.createOrder(this.order).subscribe(response => {
      this.concreteorderService.resetOrder();
      this.router.navigate(['dashboard/outcome']);
    });
  }

  updateOder() {
    this.concreteorderService.updateOrder(this.order).subscribe(response => {
      this.concreteorderService.setStateForCurrentOrder(response);
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
