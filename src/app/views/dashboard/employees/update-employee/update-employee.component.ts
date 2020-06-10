import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserModel, UserProfileUpdateModel, MessageModel, AddressModel } from 'src/app/_models';
import { AccountService, UserService, EmailService, NotificationService, CompanyService } from 'src/app/_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['../employees.component.scss']
})
export class UpdateEmployeeComponent implements OnInit {
  rForm: FormGroup;
  currentUser: UserModel;
  heading = 'Update Employee';
  subheading = 'Update employee information';
  userView: UserModel;
  addressToUpdate: AddressModel;
  showModal: boolean;
  showUpdateModal: boolean;
  actionButton: any = {
    link: '/dashboard/employees',
    label: 'View Employees'
  };
  constructor(
    private accountService: AccountService,
    private userService: UserService,
    private fb: FormBuilder,
    private companyService: CompanyService,
    private emailService: EmailService,
    private routeTo: Router,
    private messageService: NotificationService
  ) { }

  ngOnInit() {
    this.currentUser = this.accountService.CurrentUserValue;
    this.userView = this.userService.CurrentUserViewValue;
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


  onSubmit(userModel: UserProfileUpdateModel) {
    this.updateUser(userModel);
    if (userModel.CompanyId) {
      this.updateCompany(userModel);
    }
    setTimeout(() => {
      const message: MessageModel = {
        severity: 'success',
        message: 'User details updated successfully',
        summary: 'Success message',
        life: 700
      };
      this.navigateNotifyAndTo('employees', message);
    }, 1700);
  }

  navigateNotifyAndTo(url: string, message: MessageModel) {
    this.messageService.genericMessage(message);
    this.routeTo.navigate(['/dashboard/' + url]);
  }

  navigateTo(url: string) {
    const message: MessageModel = {
      severity: 'info',
      message: 'No updates done',
      summary: 'No action'
    };
    this.messageService.genericMessage(message);
    this.routeTo.navigate(['/dashboard/' + url]);
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

  updateCompany(companyModel: UserProfileUpdateModel) {
    const modelUpdated = this.userView.Company;
    modelUpdated.CompanyId = companyModel.CompanyId;
    modelUpdated.CompanyName = companyModel.CompanyName;
    modelUpdated.CompanyEmail = companyModel.CompanyEmail;
    modelUpdated.CompanyPhone = companyModel.CompanyPhone;
    modelUpdated.CompanyType = companyModel.CompanyType;
    modelUpdated.CompanyAddress = companyModel.CompanyAddress;
    modelUpdated.City = companyModel.City;
    modelUpdated.Province = companyModel.Province;
    modelUpdated.PostalCode = companyModel.PostalCode;
    modelUpdated.StatusId = companyModel.CompanyStatusId;
    this.companyService.updateCompany(modelUpdated).subscribe(data => { });
  }

  onCloseModal(event: AddressModel) {
    if (event) {
      this.updateCurrentEmployeeAddress(event);
    } else {
      this.messageService.dangerMessage('Address error', 'Something went wrong, please try again.');
    }
    if (this.showModal) {
      this.showModal = !this.showModal;
    }
  }


  updateCurrentEmployeeAddress(model: AddressModel) {
    this.messageService.successMassage('Successfully created', 'Address added successfully');
  }

  addressUpdate(item: AddressModel) {
    this.addressToUpdate = item;
    this.showUpdateModal = true;
   }
}
