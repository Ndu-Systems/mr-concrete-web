import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NavigationModel, UserModel, CompanyModel, UserQueryModel } from 'src/app/_models';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CompanyService, AccountService, ApiService, UserService } from 'src/app/_services';
import { Router } from '@angular/router';
import { COMPANY_TYPES_LIST, PROVINCE_LIST, Region } from 'src/app/_shared';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-view-company',
  templateUrl: './view-company.component.html',
  styleUrls: ['../companies.component.scss']
})
export class ViewCompanyComponent implements OnInit, OnDestroy {
  currentUser: UserModel;
  companyView: CompanyModel;
  nav: NavigationModel;
  showModal: boolean;
  showUpdateModal: boolean;
  companyTypes = COMPANY_TYPES_LIST;
  provinces = PROVINCE_LIST;
  subRegions: Region[] = [];
  employees: UserModel[] = [];

  private onDestroy$ = new Subject<boolean>();

  actionButton: any = {
    link: '/dashboard/edit-company',
    label: 'Edit company'
  };
  constructor(
    private accountService: AccountService,
    private companyService: CompanyService,
    private apiService: ApiService,
    private employeeService: UserService
  ) { }
  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  ngOnInit() {
    this.nav = this.apiService.CurrentNav;
    this.currentUser = this.accountService.CurrentUserValue;
    this.companyView = this.companyService.CurrentCompanyValue;

    const qry: UserQueryModel = {
      StatusId: '1',
      TypeOfUser: 'All'
    };
    this.employeeService.getAllUsers(qry)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(data => {
        if (data) {
          data.forEach(item => {
            if (item.CompanyId === this.companyView.CompanyId) {
              this.switchStaff(item);
            }
          });
        }
      });
   }

  switchStaff(item: UserModel) {
    switch (item.RoleId) {
      case '4':
      case '6':
        this.employees.push(item);
        break;
      default:
        break;
    }
  }

}
