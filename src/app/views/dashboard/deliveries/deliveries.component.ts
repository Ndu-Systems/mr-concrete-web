import { takeUntil } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { DeliveryService, AccountService } from 'src/app/_services';
import { UserModel, DeliveryModel, DeliveryQueryModel, Placeholder } from 'src/app/_models';
import { ADMIN_ROLE, SUPPLIER_ROLE } from '../shared';

@Component({
  selector: 'app-deliveries',
  templateUrl: './deliveries.component.html',
  styleUrls: ['./deliveries.component.scss']
})
export class DeliveriesComponent implements OnInit, OnDestroy {
  heading = 'Deliveries';
  subheading = 'List of your deliveries on the system';
  private onDestroy$ = new Subject<boolean>();
  deliveries: DeliveryModel[] = [];
  currentUser: UserModel;

  placeHolder: Placeholder = {
    imageUrl: 'assets/images/dashboard/placeholders/default.svg',
    message: 'No deliveries found.',
    link: '/dashboard/create-orders',
    linkLabel: 'Create an order'
  };

  constructor(
    private deliveryService: DeliveryService,
    private accountService: AccountService
  ) { }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  ngOnInit() {
    this.currentUser = this.accountService.CurrentUserValue;
    this.getDeliveries();
  }

  getDeliveries() {
    if (this.currentUser.Roles.RoleName === ADMIN_ROLE.typeOfUser ||
      this.currentUser.Roles.RoleName === SUPPLIER_ROLE.typeOfUser
    ) {
      const query: DeliveryQueryModel = { CompanyId: this.currentUser.CompanyId, IsDeleted: false, StatusId: '1' };
      this.deliveryService.getCompanyDeliveries(query);
      this.deliveryService.deliveries.pipe(takeUntil(this.onDestroy$)).subscribe(data => {
        if (data) {
          this.deliveries = data;
        }
      });
    }
  }

}
