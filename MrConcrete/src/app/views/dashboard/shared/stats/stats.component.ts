import { Component, OnInit } from '@angular/core';
import { ConcreteorderService } from 'src/app/_services/dashboard';
import { AccountService, MeasurementService } from 'src/app/_services';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OrderView } from 'src/app/_models/orderview.model';
import { UserModel } from 'src/app/_models';
import { STATUSES } from 'src/app/_shared/constants';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  currentUser: UserModel;
  pendingOrders = 0;
  completedOrders = 0;
  cancelledOrders = 0;

  constructor(
    private concreteorderService: ConcreteorderService,
    private accountService: AccountService,
    private measurementService: MeasurementService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.currentUser = this.accountService.CurrentUserValue;
    this.concreteorderService.getOrders(this.currentUser.UserId);
    this.concreteorderService.orders.subscribe(orders => {
      this.pendingOrders = orders.filter(x => Number(x.StatusId) === Number(STATUSES.PENDING)).length;
      this.completedOrders = orders.filter(x => Number(x.StatusId) === Number(STATUSES.COMPLETED)).length;
      this.cancelledOrders = orders.filter(x => Number(x.StatusId) === Number(STATUSES.CANCELLED)).length;

    });
  }

}
