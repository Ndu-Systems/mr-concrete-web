import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

import { AccountService } from 'src/app/_services';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/_models';
import { Message } from 'primeng/api/message';
import { ADMIN_ROLE, CUSTOMER_ROLE, DRIVER_ROLE, SUPPLIER_ROLE } from './shared';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  currentUser: UserModel;
  mobileQuery: MediaQueryList;
  showFiller = false;
  @Input() messages: Message[] = [];
  private _mobileQueryListener: () => void;
  isCustomer: boolean;
  isSupplier: boolean;
  isAdmin: boolean;
  isDriver: boolean;
  constructor(
    private accountService: AccountService,
    private routeTo: Router,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

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
  signOut() {
    this.accountService.signOut();
    localStorage.clear();
    this.routeTo.navigate(['/']);
  }

}
