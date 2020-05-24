import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/_services';

@Component({
  selector: 'app-dashboard-side-nav',
  templateUrl: './dashboard-side-nav.component.html',
  styleUrls: ['./dashboard-side-nav.component.scss']
})
export class DashboardSideNavComponent implements OnInit {

  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit() {
  }
  logout(){
    this.accountService.signOut();
  }
}
