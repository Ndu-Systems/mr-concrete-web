import { Component, OnInit } from '@angular/core';
import { Supplier, UserModel, NavigationModel, UserProfileUpdateModel, AddressModel } from 'src/app/_models';
import { SupplierService, AccountService, UserService, ApiService, NotificationService } from 'src/app/_services';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MessageService, ConfirmationService, Message } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-partner',
  templateUrl: './edit-partner.component.html',
  styleUrls: ['../partners.component.scss']
})
export class EditPartnerComponent implements OnInit {
  heading = '';
  subheading = '';
  supplier: Supplier;
  rForm: FormGroup;
  currentUser: UserModel;
  userView: UserModel;
  nav: NavigationModel;
  addressToUpdate: AddressModel;
  showModal: boolean;
  showUpdateModal: boolean;
  actionButton: any = {
    link: '/dashboard/partners',
    label: 'View partners'
  };
  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private userService: UserService,
    private messageService: NotificationService,
    private navService: ApiService,
    private routeTo: Router
  ) { }

  ngOnInit() {
    this.currentUser = this.accountService.CurrentUserValue;
    this.userView = this.userService.CurrentUserViewValue;
    this.nav = this.navService.CurrentNav;
    this.initForm();
  }

  initForm() {
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

  onSubmit(model: UserProfileUpdateModel) {
    this.updateUser(model);
    this.messageService.successMassage('Success', 'Partner updated Successfully');
    this.goBack();
  }
  updateUser(userModel: UserProfileUpdateModel) {
    const modelUpdated = this.userView;
    modelUpdated.FirstName = userModel.FirstName;
    modelUpdated.LastName = userModel.LastName;
    modelUpdated.Email = userModel.Email;
    modelUpdated.Cellphone = userModel.Cellphone;
    modelUpdated.RoleId = userModel.RoleId;
    modelUpdated.CompanyId = userModel.CompanyId;
    modelUpdated.ModifyUserId = userModel.ModifyUserId;
    this.userService.updateUser(modelUpdated).subscribe(data => {
      if (data.UserId) { }
    });
  }

  goBack() {

    this.routeTo.navigate([this.nav.returnUrl]);
  }
  updateCurrentAddress(model: AddressModel) {
    if (model.AddressId) {
      this.messageService.successMassage('Successfully created', 'Address updated successfully');
    }
  }
  addressUpdate(item: AddressModel) {
    this.addressToUpdate = item;
    this.showUpdateModal = true;
  }


  onCloseModal(event: AddressModel) {
    if (event) {
      this.updateCurrentAddress(event);
    } else {
      this.messageService.dangerMessage('Address error', 'Something went wrong, please try again.');
    }
    if (this.showModal) {
      this.showModal = !this.showModal;
    }
  }
}
