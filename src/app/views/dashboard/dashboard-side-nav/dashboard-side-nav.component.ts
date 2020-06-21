import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/_services';
import { UserModel } from 'src/app/_models';
import { CUSTOMER_ROLE, ADMIN_ROLE, SUPPLIER_ROLE, DRIVER_ROLE } from '../shared';

@Component({
  selector: 'app-dashboard-side-nav',
  templateUrl: './dashboard-side-nav.component.html',
  styleUrls: ['./dashboard-side-nav.component.scss']
})
export class DashboardSideNavComponent implements OnInit {
  currentUser: UserModel;
  isCustomer: boolean;
  isSupplier: boolean;
  isAdmin: boolean;
  isDriver: boolean;
  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit() {
    this.currentUser = this.accountService.CurrentUserValue;
    this.determineRolePermission();
  }

  determineRolePermission() {
    switch (this.currentUser.Roles.RoleName) {
      case ADMIN_ROLE.typeOfUser:
        this.isSupplier = true;
        break;
      case CUSTOMER_ROLE.typeOfUser:
        this.isCustomer = true;
        break;
      case DRIVER_ROLE.typeOfUser:
        this.isDriver = true;
        break;
      case SUPPLIER_ROLE.typeOfUser:
        this.isAdmin = true;
        break;
      default:
        break;
    }
  }

  logout() {
    this.accountService.signOut();
  }

}
