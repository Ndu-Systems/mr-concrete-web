import { Component, OnInit } from '@angular/core';
import { AccountService, CompanyService, EmailService, NotificationService, ApiService } from 'src/app/_services';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel, NavigationModel, CompanyModel, MessageModel } from 'src/app/_models';
import { COMPANY_TYPES_LIST, PROVINCE_LIST, Region } from 'src/app/_shared';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['../companies.component.scss']
})
export class EditCompanyComponent implements OnInit {
  rForm: FormGroup;
  currentUser: UserModel;
  companyView: CompanyModel;
  nav: NavigationModel;
  actionButton: any = {
    link: '/dashboard/view-company',
    label: 'View company'
  };

  companyTypes = COMPANY_TYPES_LIST;
  provinces = PROVINCE_LIST;
  subRegions: Region[] = [];

  constructor(
    private accountService: AccountService,
    private companyService: CompanyService,
    private fb: FormBuilder,
    private emailService: EmailService,
    private routeTo: Router,
    private messageService: NotificationService,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.nav = this.apiService.CurrentNav;
    this.currentUser = this.accountService.CurrentUserValue;
    this.companyView = this.companyService.CurrentCompanyValue;
    this.rForm = this.fb.group({
      CompanyEmail: new FormControl(
        this.companyView.CompanyEmail,
        Validators.compose([
          Validators.required,
          Validators.email])),
      CompanyId: [this.companyView.CompanyId, Validators.required],
      CompanyName: [this.companyView.CompanyName, Validators.required],
      CompanyPhone: [this.companyView.CompanyPhone, Validators.required],
      ParentId: [this.companyView.ParentId],
      CompanyAddress: [this.companyView.CompanyAddress, Validators.required],
      Province: [this.companyView.Province],
      CompanyType: [this.companyView.CompanyType, Validators.required],
      City: [this.companyView.City, Validators.required],
      PostalCode: [this.companyView.PostalCode],
      CreateUserId: [this.currentUser.UserId, Validators.required],
      ModifyUserId: [this.currentUser.UserId, Validators.required],
      IsDeleted: [this.companyView.IsDeleted],
      StatusId: [this.companyView.StatusId]
    });
  }

  loadSubRegions() {
    this.provinces.forEach(item => {
      item.subRegions.forEach(sub => {
        this.subRegions.push(sub);
      });
    });
  }
  onProvinceSelect(parentId) {
    this.loadSubRegions();
    this.subRegions = this.subRegions.filter(x => x.parentId === parentId);
  }

  routTo() {

    const message: MessageModel = {
      severity: 'info',
      message: 'No updates done',
      summary: 'No action'
    };

    this.messageService.genericMessage(message);
    this.routeTo.navigate([this.actionButton.link]);

  }

  onSubmit(model: CompanyModel) {
    this.companyService.updateCompany(model).subscribe(data => {
      if (data.CompanyId) {
        const message: MessageModel = {
          severity: 'success',
          message: 'Company updated successfully',
          summary: 'Updated successfully'
        };
        this.messageService.genericMessage(message);
        this.companyService.updateCompanyState(data);
        setTimeout(() => {
          this.routeTo.navigate([this.actionButton.link]);
        }, 1500);
      }
    });
  }


}
