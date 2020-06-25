import { UserModel } from './../../../../_models/user.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DeliveryModel, Placeholder, ConfirmModel } from 'src/app/_models';
import { NotificationService, ApiService, DeliveryService } from 'src/app/_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-deliveries',
  templateUrl: './list-deliveries.component.html',
  styleUrls: ['../deliveries.component.scss']
})
export class ListDeliveriesComponent implements OnInit {
  @Input() deliveries: DeliveryModel[];
  @Input() currentUser: UserModel;
  @Output() deletionCompleted: EventEmitter<DeliveryModel> = new EventEmitter();

  placeHolder: Placeholder = {
    imageUrl: 'assets/images/dashboard/placeholders/default.svg',
    message: 'No deliveries yet found.',
    link: '/dashboard/create-orders',
    linkLabel: 'Create an order'
  };
  confirmModel: ConfirmModel = {
    Heading: 'Are you sure?',
    Description: 'This record will not be visible on the system.',
    ButtonLabel: 'Yes, delete',
    Image: 'assets/images/dashboard/action-card/delete.svg'
  };
  showConfirmDeleteModal: boolean;

  constructor(
    private apiService: ApiService,
    private deliveryService: DeliveryService,
    private messageService: NotificationService,
    private routTo: Router
  ) { }

  ngOnInit() {
  }

}
