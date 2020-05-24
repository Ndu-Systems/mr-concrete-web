import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AccountService } from 'src/app/_services';
import { UserModel } from 'src/app/_models';

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
    if (this.user.Role.RoleName === 'Admin') { this.isAdmin = true; }else {
      this.isAdmin = false;
    }
    if (this.user.Role.RoleName === 'Supplier') { this.isSupplier = true; }else {
      this.isSupplier = false;
    }
    if (this.user.Role.RoleName === 'Engineer') { this.isEngineer = true; }else {
      this.isEngineer = false;
    }
  }

}
