import { Component, OnInit, Input } from '@angular/core';
import { ConcreteorderService } from 'src/app/_services/dashboard';
import { Router } from '@angular/router';
import { OrderView } from 'src/app/_models/orderview.model';
import { Placeholder } from 'src/app/_models';

@Component({
  selector: 'app-supplier-list-orders',
  templateUrl: './supplier-list-orders.component.html',
  styleUrls: ['./supplier-list-orders.component.scss']
})
export class SupplierListOrdersComponent implements OnInit {
@Input() orders: OrderView[];
  constructor(
    private concreteorderService: ConcreteorderService,
    private router: Router
  ) { }
  placeHolder: Placeholder = {
    imageUrl: 'assets/images/dashboard/placeholders/empty-cart.svg',
    message: 'There are no orders recently'
  };
  ngOnInit() {
  }
  view(item) {
    this.concreteorderService.setStateForCurrentOrder(item);
    this.router.navigate(['dashboard/view-order']);
  }
}
