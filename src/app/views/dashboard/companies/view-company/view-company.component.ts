import { Component, OnInit } from '@angular/core';
import { NavigationModel, UserModel, CompanyModel } from 'src/app/_models';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CompanyService, AccountService, ApiService } from 'src/app/_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-company',
  templateUrl: './view-company.component.html',
  styleUrls: ['../companies.component.scss']
})
export class ViewCompanyComponent implements OnInit {
  rForm: FormGroup;
  currentUser: UserModel;
  companyView: CompanyModel;
  nav: NavigationModel;
  showModal: boolean;
  showUpdateModal: boolean;
  actionButton: any = {
    link: '/dashboard/edit-company',
    label: 'Edit company'
  };
  constructor(
    private accountService: AccountService,
    private fb: FormBuilder,
    private companyService: CompanyService,
    private routeTo: Router,
    private apiService: ApiService

  ) { }

  ngOnInit() {
    this.nav = this.apiService.CurrentNav;
    this.currentUser = this.accountService.CurrentUserValue;
    this.companyView = this.companyService.CurrentCompanyValue;
  }


}
