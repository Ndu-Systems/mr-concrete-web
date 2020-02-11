import { Component, OnInit } from '@angular/core';
import { ConcreteorderService } from 'src/app/_services/dashboard';
import { Observable } from 'rxjs';
import { OrderView } from 'src/app/_models/orderview.model';
import { UserModel, SupplierOrdersModel } from 'src/app/_models';
import { AccountService } from 'src/app/_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.scss']
})
export class ListOrdersComponent implements OnInit {

  heading = 'Orders';
  subheading = 'Order list';
  orders$: Observable<OrderView[]>;
  isSupplier: boolean;
  isAdmin: boolean;
  isEngineer: boolean;
  supplierOrder: SupplierOrdersModel;
  actionButton: any = {
    link: '/dashboard/create-orders',
    label: 'Create Order'
  };
  currentUser: UserModel;
  constructor(
    private concreteorderService: ConcreteorderService,
    private accountService: AccountService,
    private router: Router,


  ) { }

  ngOnInit() {
    this.currentUser = this.accountService.CurrentUserValue;
    this.orders$ = this.concreteorderService.orders;
    this.concreteorderService.getOrders(this.currentUser.UserId);
    this.setRoles();
  }
  view(item) {
    this.concreteorderService.setStateForCurrentOrder(item);
    this.router.navigate(['dashboard/view-order']);
  }
  setRoles() {
    if (this.currentUser.Role.RoleName === 'Admin') { this.isAdmin = true; } else {
      this.isAdmin = false;
    }
    if (this.currentUser.Role.RoleName === 'Supplier') {
      this.isSupplier = true;
      this.concreteorderService.getOrdersForSupplier(this.currentUser.UserId).subscribe(result => {
        if (result) {
          this.supplierOrder = new SupplierOrdersModel();
          this.supplierOrder.Orders = result.Orders;
        }
      });
    } else {
      this.isSupplier = false;
    }
    if (this.currentUser.Role.RoleName === 'Engineer') { this.isEngineer = true; } else {
      this.isEngineer = false;
    }

  }
}
