import { Component, OnInit } from '@angular/core';
import { ConcreteorderService } from 'src/app/_services/dashboard';
import { Observable } from 'rxjs';
import { OrderView } from 'src/app/_models/orderview.model';
import { UserModel, SupplierOrdersModel, Placeholder, Supplier } from 'src/app/_models';
import { AccountService, SupplierService } from 'src/app/_services';
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
  supplier: Supplier;

  actionButton: any = {
    link: '/dashboard/create-orders',
    label: 'Create Order'
  };

  placeHolder: Placeholder = {
    imageUrl: 'assets/images/dashboard/placeholders/empty-cart.svg',
    message: 'There are no orders recently',
    link: '/dashboard/create-orders',
    linkLabel: 'Create Order'
  };
  currentUser: UserModel;
  constructor(
    private concreteorderService: ConcreteorderService,
    private accountService: AccountService,
    private router: Router,
    private supplierService: SupplierService

  ) { }

  ngOnInit() {
    this.currentUser = this.accountService.CurrentUserValue;
    this.orders$ = this.concreteorderService.orders;
    this.concreteorderService.getOrders(this.currentUser.UserId);
    this.setRoles();
    this.concreteorderService.resetOrder();
  }
  view(item) {
    this.concreteorderService.setStateForCurrentOrder(item);
    this.router.navigate(['dashboard/view-order']);
  }
  remove(item: OrderView) {
    item.StatusId = 6;
    this.concreteorderService.updateOrder(item).subscribe(response => {
      this.concreteorderService.setStateForCurrentOrder(response);
      this.router.navigate(['dashboard/outcome']);
    });
  }
  setRoles() {
    if (this.currentUser.Role.RoleName === 'Admin') { this.isAdmin = true; } else {
      this.isAdmin = false;
    }
    if (this.currentUser.Role.RoleName === 'Supplier') {
      this.isSupplier = true;
      this.supplierService.getSupplier(this.currentUser.Email).subscribe(data => {
        this.supplier = data;

        this.concreteorderService.getOrdersForSupplier(this.supplier.SupplierId).subscribe(result => {
          if (result) {
            this.supplierOrder = new SupplierOrdersModel();
            this.supplierOrder.Orders = result;
            this.actionButton = undefined;
           }
        });
      });
    } else {
      this.isSupplier = false;
    }

    if (this.currentUser.Role.RoleName === 'Engineer') { this.isEngineer = true; } else {
      this.isEngineer = false;
    }

  }
}
