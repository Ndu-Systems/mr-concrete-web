import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

import { AccountService } from 'src/app/_services';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/_models';
import { Message } from 'primeng/api/message';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  currentUser: UserModel;
  mobileQuery: MediaQueryList;

  @Input() messages: Message[] = [];
  private _mobileQueryListener: () => void;

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
  }

  signOut() {
    this.accountService.signOut();
    localStorage.clear();
    this.routeTo.navigate(['/']);
  }

}
