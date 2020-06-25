import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UserModel, NavigationModel } from 'src/app/_models';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DeliveryService, NotificationService, AccountService } from 'src/app/_services';

@Component({
  selector: 'app-add-delivery',
  templateUrl: './add-delivery.component.html',
  styleUrls: ['../deliveries.component.scss']
})
export class AddDeliveryComponent implements OnInit {
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  rForm: FormGroup;
  currentUser: UserModel;
  drivers: UserModel[] = [];

  constructor(
    private deliveryService: DeliveryService,
    private fb: FormBuilder,
    private accountService: AccountService,
    private messageService: NotificationService
  ) { }

  ngOnInit() {
    this.currentUser = this.accountService.CurrentUserValue;
    this.rForm = this.fb.group({
      OrderId: [this.currentUser.UserId, Validators.required],
      UserId: [this.currentUser.UserId, Validators.required],
      DriverId: [null],
      CreateUserId: [this.currentUser.UserId, Validators.required],
      DeliveryStartDateTime: [this.currentUser.UserId, Validators.required],
      DeliveryEndDateTime: [this.currentUser.UserId, Validators.required],
      ModifyUserId: [this.currentUser.UserId, Validators.required],
      IsDeleted: [false],
      StatusId: [1]
    });
  }

}
