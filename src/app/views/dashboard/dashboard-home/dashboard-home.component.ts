import { Supplier } from './../../../_models/supplier.model';
import { Component, OnInit } from '@angular/core';
import { ConcreteorderService, CounterService } from 'src/app/_services/dashboard';
import { AccountService } from 'src/app/_services';
import { UserModel, Placeholder, CounterModel, SettingCounterModel } from 'src/app/_models';
import { OrderView } from 'src/app/_models/orderview.model';
import { ORDER_PLACEMENT_CONFIRMATION } from 'src/app/_shared';
import { StatusEnum } from 'src/app/_shared/status.enum';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Message } from 'primeng/api';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss'],
  providers: [MessageService]
})
export class DashboardHomeComponent implements OnInit {
  order: OrderView;
  user: UserModel;
  supplier: Supplier;
  orders$: Observable<OrderView[]>;
  recentOrder: OrderView;
  status: string;
  toStatusId: number;
  counter: CounterModel;
  settingCounter: SettingCounterModel;
  class = 'primary';
  confirmationPageParams = ORDER_PLACEMENT_CONFIRMATION;
  msgs: Message[] = [];
  placeHolder: Placeholder = {
    imageUrl: 'assets/images/dashboard/placeholders/no-order.svg',
    message: 'There are no orders recently',
    link: '/dashboard/orders',
    linkLabel: 'View Orders'
  };


  constructor(
    private concreteorderService: ConcreteorderService,
    private accountService: AccountService,
    private counterService: CounterService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = this.accountService.CurrentUserValue;
  }
  showSuccess() {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'Order submitted' });
  }

  updateOrderStatus(item: OrderView, statusId: number) {
    item.StatusId = statusId;
    this.concreteorderService.updateOrder(item).subscribe(response => {
      this.concreteorderService.setStateForCurrentOrder(response);
      localStorage.setItem('confirmation', JSON.stringify(this.confirmationPageParams));
      this.router.navigate(['dashboard/outcome']);
    });
  }
}
