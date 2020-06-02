import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UserModel } from 'src/app/_models';
import { AccountService } from 'src/app/_services';
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
    private routeTo: Router
  ) { }

  ngOnInit() {
    this.user = this.accountService.CurrentUserValue;
  }
  signOut() {
    this.accountService.signOut();
  }
  navigateTo(url: string) {
    this.routeTo.navigate(['/dashboard/' + url]);
  }

  toggleClick() {
    this.toggle.emit(true);
  }
}
