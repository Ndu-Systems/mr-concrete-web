import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserModel, CompanyModel } from 'src/app/_models';
import { COMPANY_TYPES_LIST, PROVINCE_LIST, Region } from 'src/app/_shared';
import { CompanyService, AccountService, EmailService, NotificationService } from 'src/app/_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['../companies.component.scss']
})
export class AddCompanyComponent implements OnInit {
  rForm: FormGroup;
  currentUser: UserModel;
  heading = 'Add a Company';
  subheading = 'Create a new company for your organization';
  actionButton: any = {
    link: '/dashboard/companies',
    label: 'View Companies'
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
    private messageService: NotificationService
  ) { }

  ngOnInit() {
    this.currentUser = this.accountService.CurrentUserValue;
    this.rForm = this.fb.group({
      CompanyEmail: new FormControl(
        null,
        Validators.compose([
          Validators.required,
          Validators.email])),
      CompanyName: [null, Validators.required],
      CompanyPhone: [null, Validators.required],
      ParentId: [this.currentUser.CompanyId],
      CompanyAddress: [null, Validators.required],
      Province: [null],
      CompanyType: [null, Validators.required],
      City: [null, Validators.required],
      PostalCode: [''],
      CreateUserId: [this.currentUser.UserId, Validators.required],
      ModifyUserId: [this.currentUser.UserId, Validators.required],
      IsDeleted: [false],
      StatusId: [1]
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
    this.routeTo.navigate([this.actionButton.link]);
  }
  onSubmit(model: CompanyModel) {
    this.companyService.addCompany(model).subscribe(data => {
      if (data.CompanyId) {
        this.messageService.successMassage('Company created successfully', 'No action required');
        this.currentUser.CompanyId = data.CompanyId;
        if (this.currentUser.Company === null || this.currentUser.Company === undefined) {
          this.currentUser.Company = data;
        }
        this.accountService.updateUserState(this.currentUser);
        this.routTo();
      }
    });
  }
}
