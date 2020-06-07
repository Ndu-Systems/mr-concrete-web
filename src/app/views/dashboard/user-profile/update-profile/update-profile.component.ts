import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserModel, MessageModel, UserProfileUpdateModel } from 'src/app/_models';
import { AccountService, NotificationService } from 'src/app/_services';
import { CompanyService, UserService } from 'src/app/_services/dashboard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['../user-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {
  user: UserModel;
  heading = 'Update profile';
  subheading = 'Update your user profile here.';
  rForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private companyService: CompanyService,
    private messageService: NotificationService,
    private userService: UserService,
    private routeTo: Router
  ) { }

  ngOnInit() {
    this.user = this.accountService.CurrentUserValue;
    this.initializeModel();
  }
  initializeModel() {
    if (this.user.Company !== null) {
      this.rForm = this.fb.group({
        FirstName: [this.user.FirstName, Validators.required],
        LastName: [this.user.LastName, Validators.required],
        Email: [this.user.Email, Validators.required],
        Cellphone: [this.user.Cellphone, Validators.required],
        RoleId: [this.user.RoleId, Validators.required],
        CompanyId: [this.user.CompanyId],
        ModifyUserId: [this.user.UserId, Validators.required],
        StatusId: [this.user.StatusId],
        CompanyName: [this.user.Company.CompanyName, Validators.required],
        CompanyPhone: [this.user.Company.CompanyPhone, Validators.required],
        CompanyEmail: [this.user.Company.CompanyEmail, Validators.required],
        CompanyType: [this.user.Company.CompanyType, Validators.required],
        CompanyAddress: [this.user.Company.CompanyAddress],
        City: [this.user.Company.City],
        Province: [this.user.Company.Province],
        PostalCode: [this.user.Company.PostalCode],
        CompanyStatusId: [this.user.Company.StatusId]
      });
    } else {

      this.rForm = this.fb.group({
        FirstName: [this.user.FirstName, Validators.required],
        LastName: [this.user.LastName, Validators.required],
        Email: [this.user.Email, Validators.required],
        Cellphone: [this.user.Cellphone, Validators.required],
        RoleId: [this.user.RoleId, Validators.required],
        CompanyId: [null],
        ModifyUserId: [this.user.UserId, Validators.required],
        StatusId: [this.user.StatusId],
        CompanyName: [null],
        CompanyPhone: [null],
        CompanyEmail: [null],
        CompanyType: [null],
        CompanyAddress: [null],
        City: [null],
        Province: [null],
        PostalCode: [null],
        CompanyStatusId: [null]
      });

    }

  }

  onSubmit(userModel: UserProfileUpdateModel) {
    this.updateUser(userModel);
    this.updateCompany(userModel);
    setTimeout(() => {
      const message: MessageModel = {
        severity: 'success',
        message: 'User details updated successfully',
        summary: 'Success message',
        life: 700
      };
      this.navigateNotifyAndTo('profile', message);
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
    const modelUpdated = this.user;
    modelUpdated.FirstName = userModel.FirstName;
    modelUpdated.LastName = userModel.LastName;
    modelUpdated.Email = userModel.Email;
    modelUpdated.Cellphone = userModel.Cellphone;
    modelUpdated.RoleId = userModel.RoleId;
    modelUpdated.CompanyId = userModel.CompanyId;
    modelUpdated.ModifyUserId = userModel.ModifyUserId;
    this.userService.updateUser(modelUpdated).subscribe(data => {
      if (data.UserId) {
        this.accountService.updateUserState(modelUpdated);
      }
    });
  }

  updateCompany(companyModel: UserProfileUpdateModel) {
    const modelUpdated = this.user.Company;
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
    this.companyService.updateCompany(modelUpdated).subscribe(data => {
      if (data.CompanyId) {
        this.companyService.updateCompanyState(data);
      }
    });
  }

}
