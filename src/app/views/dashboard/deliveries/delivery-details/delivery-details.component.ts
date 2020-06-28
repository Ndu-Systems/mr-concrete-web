import { Component, OnInit } from '@angular/core';
import { NavigationModel, DeliveryModel, UserModel } from 'src/app/_models';
import { ApiService, DeliveryService, AccountService } from 'src/app/_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delivery-details',
  templateUrl: './delivery-details.component.html',
  styleUrls: ['../deliveries.component.scss']
})
export class DeliveryDetailsComponent implements OnInit {
  nav: NavigationModel;
  delivery: DeliveryModel;
  currentUser: UserModel;

  constructor(
    private deliveryService: DeliveryService,
    private accountService: AccountService,
    private routeTo: Router,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.nav = this.apiService.CurrentNav;
    this.currentUser = this.accountService.CurrentUserValue;
    this.delivery = this.deliveryService.CurrentDeliveryValue;
  }

}
