import { DeliveryModel, UserModel, DeliveryQueryModel, NavigationModel } from 'src/app/_models';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DeliveryService, AccountService, ApiService } from 'src/app/_services';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-driver-dashboard-home',
  templateUrl: './driver-dashboard-home.component.html',
  styleUrls: ['../dashboard-home.component.scss']
})
export class DriverDashboardHomeComponent implements OnInit, OnDestroy {
  heading = 'Your order deliveries';
  subheading = 'A list of deliveries assigned to you';
  actionButton: any = {
    link: '/dashboard/deliveries',
    label: 'View all deliveries'
  };
  today: Date;
  private onDestroy$ = new Subject<boolean>();
  deliveries: DeliveryModel[] = [];
  currentUser: UserModel;

  constructor(
    private deliveryService: DeliveryService,
    private accountService: AccountService,
    private routeTo: Router,
    private apiService: ApiService) { }

  ngOnInit() {
    this.currentUser = this.accountService.CurrentUserValue;
    this.getDriverDeliveries();
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  getDriverDeliveries() {
    const query: DeliveryQueryModel = { UserId: this.currentUser.UserId, IsDeleted: false, StatusId: '1' };
    this.deliveryService.getDriverDeliveries(query);
    this.deliveryService.deliveries.pipe(takeUntil(this.onDestroy$)).subscribe(data => {
      if (data) {
        this.deliveries = data;
      }
    });
  }

  orderDetails(model: DeliveryModel) {
    this.deliveryService.updateDeliveryState(model);
    const nav: NavigationModel = {
      heading: 'Delivery details',
      subheading: 'Delivery information for updating & workflow process.'
    };
    this.apiService.updateNavState(nav);
    this.routeTo.navigate(['/dashboard/delivery-details']);
  }
}
