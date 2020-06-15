import { UserService } from './../../../../_services/dashboard/user.service';
import { AccountService } from './../../../../_services/account.service';
import { Component, OnInit } from '@angular/core';
import { NavigationModel, AddressModel, UserModel } from 'src/app/_models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompanyService, EmailService, NotificationService, ApiService } from 'src/app/_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-partner',
  templateUrl: './view-partner.component.html',
  styleUrls: ['../partners.component.scss']
})
export class ViewPartnerComponent implements OnInit {
  rForm: FormGroup;
  currentUser: UserModel;
  userView: UserModel;
  addressToUpdate: AddressModel;
  nav: NavigationModel;
  showModal: boolean;
  showUpdateModal: boolean;
  actionButton: any = {
    link: '/dashboard/update-partner',
    label: 'edit partner'
  };
  constructor(
    private accountService: AccountService,
    private userService: UserService,
    private fb: FormBuilder,
    private companyService: CompanyService,
    private emailService: EmailService,
    private routeTo: Router,
    private messageService: NotificationService,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.currentUser = this.accountService.CurrentUserValue;
    this.userView = this.userService.CurrentUserViewValue;
    this.nav = this.apiService.CurrentNav;
    this.initializeModel();
  }

  initializeModel() {
    if (this.userView.Company) {
      this.rForm = this.fb.group({
        FirstName: [this.userView.FirstName, Validators.required],
        LastName: [this.userView.LastName, Validators.required],
        Email: [this.userView.Email, Validators.required],
        Cellphone: [this.userView.Cellphone, Validators.required],
        RoleId: [this.userView.RoleId, Validators.required],
        CompanyId: [this.userView.CompanyId],
        ModifyUserId: [this.userView.UserId, Validators.required],
        StatusId: [this.userView.StatusId],
        CompanyName: [this.userView.Company.CompanyName, Validators.required],
        CompanyPhone: [this.userView.Company.CompanyPhone, Validators.required],
        CompanyEmail: [this.userView.Company.CompanyEmail, Validators.required],
        CompanyType: [this.userView.Company.CompanyType, Validators.required],
        CompanyAddress: [this.userView.Company.CompanyAddress],
        City: [this.userView.Company.City],
        Province: [this.userView.Company.Province],
        PostalCode: [this.userView.Company.PostalCode],
        CompanyStatusId: [this.userView.Company.StatusId]
      });
    } else {
      this.userView.CompanyId = this.currentUser.CompanyId; // to be updated with a list default admin companyId
      this.rForm = this.fb.group({
        FirstName: [this.userView.FirstName, Validators.required],
        LastName: [this.userView.LastName, Validators.required],
        Email: [this.userView.Email, Validators.required],
        Cellphone: [this.userView.Cellphone, Validators.required],
        RoleId: [this.userView.RoleId, Validators.required],
        CompanyId: [this.userView.CompanyId],
        ModifyUserId: [this.userView.UserId, Validators.required],
        StatusId: [this.userView.StatusId]
      });

    }

  }

  onCloseModal(event: AddressModel) {
    if (event) {
      this.updateCurrentPartnerAddress(event);
    } else {
      this.messageService.dangerMessage('Address error', 'Something went wrong, please try again.');
    }
    if (this.showModal) {
      this.showModal = !this.showModal;
    }
  }

  updateCurrentPartnerAddress(model: AddressModel) {
    this.messageService.successMassage('Successfully created', 'Address added successfully');
    if (this.userView.Address == null) {
      this.userView.Address = [];
    }
    this.userView.Address.forEach((item, index) => {
      if (item.AddressId === model.AddressId) {
        this.userView.Address[index] = model;
        this.userService.updateUserViewState(this.userView);
      }
    });
  }
  addressUpdate(item: AddressModel) {
    this.addressToUpdate = item;
    this.showUpdateModal = true;
  }
}
