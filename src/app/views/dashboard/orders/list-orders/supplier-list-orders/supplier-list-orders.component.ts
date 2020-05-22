import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ConcreteorderService } from 'src/app/_services/dashboard';
import { Router } from '@angular/router';
import { OrderView } from 'src/app/_models/orderview.model';
import { Placeholder } from 'src/app/_models';
import { ConfirmationPageModel } from 'src/app/_shared';

@Component({
  selector: 'app-supplier-list-orders',
  templateUrl: './supplier-list-orders.component.html',
  styleUrls: ['./supplier-list-orders.component.scss']
})
export class SupplierListOrdersComponent implements OnInit {
  @Input() orders: OrderView[];

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
  constructor(
    private concreteorderService: ConcreteorderService,
    private router: Router
  ) { }
  placeHolder: Placeholder = {
    imageUrl: 'assets/images/dashboard/placeholders/empty-cart.svg',
    message: 'There are no orders recently'
  };
  ngOnInit() {
    localStorage.removeItem('order');
    localStorage.removeItem('confirmation');
  }

  updateOrderStatus(item: OrderView, statusId: number) {
    item.StatusId = statusId;
    this.concreteorderService.updateOrder(item).subscribe(response => {
      this.concreteorderService.setStateForCurrentOrder(response);
      localStorage.setItem('confirmation', JSON.stringify(this.confirmationPageParams));
      this.router.navigate(['dashboard/outcome']);
    });
  }

  viewOrder(order: OrderView) {
    this.concreteorderService.setStateForCurrentOrder(order);
    this.router.navigate(['dashboard/view-order']);
  }


}
