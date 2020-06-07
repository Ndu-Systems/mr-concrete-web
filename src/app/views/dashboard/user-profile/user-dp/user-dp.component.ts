import { NavigationModel } from './../../../../_models/navigation.model';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UserModel } from 'src/app/_models';
import { AccountService, ApiService } from 'src/app/_services';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-user-dp',
  templateUrl: './user-dp.component.html',
  styleUrls: ['./user-dp.component.scss']
})
export class UserDpComponent implements OnInit {
  @Output() toggle: EventEmitter<any> = new EventEmitter();
  user: UserModel;
  constructor(
    private accountService: AccountService,
    private navigateService: ApiService,
    private routeTo: Router
  ) { }

  ngOnInit() {
    this.user = this.accountService.CurrentUserValue;
  }
  signOut() {
    this.accountService.signOut();
  }
  navigateTo(url: string) {
    const navigation: NavigationModel = {
      heading: 'Update',
      subheading: `Update password`,
      returnUrl: '/dashboard'
    };
    this.navigateService.updateNavState(navigation);
    this.routeTo.navigate(['/dashboard/' + url]);
  }

  toggleClick() {
    this.toggle.emit(true);
  }

}
