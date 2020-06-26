import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { UserModel, NavigationModel, DeliveryModel, UserQueryModel } from 'src/app/_models';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DeliveryService, NotificationService, AccountService, UserService } from 'src/app/_services';
import { Order } from 'src/app/_models/order.model';

@Component({
  selector: 'app-add-delivery',
  templateUrl: './add-delivery.component.html',
  styleUrls: ['../deliveries.component.scss']
})
export class AddDeliveryComponent implements OnInit {
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  @Input() order: Order;
  rForm: FormGroup;
  currentUser: UserModel;
  drivers: UserModel[] = [];

  constructor(
    private deliveryService: DeliveryService,
    private fb: FormBuilder,
    private accountService: AccountService,
    private messageService: NotificationService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.currentUser = this.accountService.CurrentUserValue;
    this.rForm = this.fb.group({
      OrderId: [this.order.OrderId, Validators.required],
      UserId: [this.currentUser.UserId, Validators.required],
      DriverId: [null, Validators.required],
      DeliveryTime: [this.order.DeliveryTime, Validators.required],
      DeliveryStartDateTime: [this.order.DeliveryDate, Validators.required],
      DeliveryEndDateTime: [this.currentUser.UserId, Validators.required],
      IsDeleted: [false],
      StatusId: [1]
    });
    this.loadDrivers();
  }

  loadDrivers() {
    const query: UserQueryModel = { TypeOfUser: 'All', StatusId: '1' };
    this.userService.getAllUsers(query).subscribe(data => {
      if (data) {
        this.drivers = data.filter(d => d.RoleId === '6');
      }
    });
  }

  onSubmit(model: DeliveryModel) {
    this.deliveryService.AddDelivery(model);
    setTimeout(() => {
      this.messageService.successMassage('Delivery Created Successfully', 'Delivery for order created.');
      this.cancel();
     }, 1000);
  }
  cancel() {
    this.closeModal.emit(false);
  }
}
