import { Component, OnInit } from '@angular/core';
import { AccountService, NotificationService } from 'src/app/_services';
import { UserModel, AddressModel } from 'src/app/_models';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: UserModel;
  heading = 'My Profile';
  subheading = 'This is your system profile information';
  rating = 3;
  showModal: boolean;
  addressToUpdate: AddressModel;
  showUpdateModal: boolean;
  actionButton: any = {
    link: '/dashboard/update-profile',
    label: 'Update profile'
  };

  constructor(
    private accountService: AccountService,
    private messageService: NotificationService


  ) { }

  ngOnInit() {
    this.user = this.accountService.CurrentUserValue;
  }

  onCloseModal(event: AddressModel) {

    if (event) {
      this.updateCurrentUserAddress(event);
    } else {
      this.messageService.dangerMessage('Address error', 'Something went wrong, please try again.');
    }
    this.showModal = !this.showModal;
  }

  updateCurrentUserAddress(model: AddressModel) {
    this.messageService.successMassage('Successfully created', 'Address added successfully');
    if (this.user.Address == null) {
      this.user.Address = [];
    }
    this.user.Address.push(model);
    this.accountService.updateUserState(this.user);
  }
  updateCurrentAddress(model: AddressModel) {
    if (model.AddressId) {
      this.messageService.successMassage('Successfully created', 'Address added successfully');
    }
  }
  addressUpdate(item: AddressModel) {
    this.addressToUpdate = item;
    this.showUpdateModal = true;
  }

}
