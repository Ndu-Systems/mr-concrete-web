import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/_services';
import { UserModel } from 'src/app/_models';

@Component({
  selector: 'app-dashboard-side-nav',
  templateUrl: './dashboard-side-nav.component.html',
  styleUrls: ['./dashboard-side-nav.component.scss']
})
export class DashboardSideNavComponent implements OnInit {
  currentUser: UserModel;
  isCustomer: boolean;
  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit() {
    this.currentUser = this.accountService.CurrentUserValue;
    this.isCustomer = this.currentUser.Roles.RoleName === 'Customer';
  }
  logout() {
    this.accountService.signOut();
  }
}
