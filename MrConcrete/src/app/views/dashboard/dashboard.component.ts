import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/_services';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/_models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  currentUser: UserModel;
  constructor(
    private accountService: AccountService,
    private routeTo: Router
  ) { }

  ngOnInit() {
    this.currentUser = this.accountService.CurrentUserValue;
  }

  signOut() {
    this.accountService.signOut();
    this.routeTo.navigate(['/']);
  }

}
