import { Component, OnInit, Input } from '@angular/core';
import {  Concreteorder } from 'src/app/_models';
import { ConcreteorderService } from 'src/app/_services/dashboard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supplier-list-orders',
  templateUrl: './supplier-list-orders.component.html',
  styleUrls: ['./supplier-list-orders.component.scss']
})
export class SupplierListOrdersComponent implements OnInit {
@Input() orders: Concreteorder[];
  constructor(
    private concreteorderService: ConcreteorderService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  view(item) {
    this.concreteorderService.setStateForCurrentOrder(item);
    this.router.navigate(['dashboard/view-order']);
  }
}
