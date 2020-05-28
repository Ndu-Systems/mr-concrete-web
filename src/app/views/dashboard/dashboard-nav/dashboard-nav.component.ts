import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AccountService } from 'src/app/_services';
import { UserModel } from 'src/app/_models';
import { Roles } from 'src/app/_shared';

@Component({
  selector: 'app-dashboard-nav',
  templateUrl: './dashboard-nav.component.html',
  styleUrls: ['./dashboard-nav.component.scss']
})
export class DashboardNavComponent implements OnInit {
  @Output() toggleNav: EventEmitter<any> = new EventEmitter<any>();
  isSupplier: boolean;
  isAdmin: boolean;
  isEngineer: boolean;
  isCustomer: boolean;
  user: UserModel;
  today: number = Date.now();

  constructor(
    private accountService: AccountService,
  ) { }

  ngOnInit() {
    this.user = this.accountService.CurrentUserValue;
    this.setRoles();
  }

  toggleNave() {
    this.toggleNav.emit(true);
  }
  setRoles() {
    if (this.user.Role.RoleName === Roles.ADMIN) { this.isAdmin = true; }
    if (this.user.Role.RoleName === Roles.SUPPLIER) { this.isSupplier = true; }
    if (this.user.Role.RoleName === Roles.CUSTOMER) { this.isCustomer = true; }
  }

}
