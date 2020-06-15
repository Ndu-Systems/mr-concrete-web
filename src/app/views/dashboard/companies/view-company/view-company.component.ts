import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NavigationModel, UserModel, CompanyModel } from 'src/app/_models';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CompanyService, AccountService, ApiService } from 'src/app/_services';
import { Router } from '@angular/router';
import { COMPANY_TYPES_LIST, PROVINCE_LIST, Region } from 'src/app/_shared';

@Component({
  selector: 'app-view-company',
  templateUrl: './view-company.component.html',
  styleUrls: ['../companies.component.scss']
})
export class ViewCompanyComponent implements OnInit {
  currentUser: UserModel;
  companyView: CompanyModel;
  nav: NavigationModel;
  showModal: boolean;
  showUpdateModal: boolean;
  companyTypes = COMPANY_TYPES_LIST;
  provinces = PROVINCE_LIST;
  subRegions: Region[] = [];
  actionButton: any = {
    link: '/dashboard/edit-company',
    label: 'Edit company'
  };
  constructor(
    private accountService: AccountService,
    private companyService: CompanyService,
    private apiService: ApiService

  ) { }

  ngOnInit() {
    this.nav = this.apiService.CurrentNav;
    this.currentUser = this.accountService.CurrentUserValue;
    this.companyView = this.companyService.CurrentCompanyValue;
  }



}
