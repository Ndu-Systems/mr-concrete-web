import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private accountService: AccountService,
    private routeTo: Router
  ) { }

  ngOnInit() {
  }

  signOut() {
    this.accountService.signOut();
    this.routeTo.navigate(['/']);
  }

}
