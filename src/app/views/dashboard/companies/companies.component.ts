import { takeUntil } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Placeholder, CompanyModel, CompanyQueryModel, UserModel } from 'src/app/_models';
import { AccountService, CompanyService, ApiService } from 'src/app/_services';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit, OnDestroy {
  heading = 'Companies';
  subheading = 'List of your companies on the system';
  private onDestroy$ = new Subject<boolean>();

  currentUser: UserModel;
  companies: CompanyModel[] = [];
  actionButton: any = {
    link: '/dashboard/add-company',
    label: '+ Company'
  };

  constructor(
    private accountService: AccountService,
    private companyService: CompanyService,
    private apiService: ApiService,
    private routTo: Router
  ) { }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  ngOnInit() {
    this.currentUser = this.accountService.CurrentUserValue;

    this.getCompanies();

  }

  getCompanies() {
    const query: CompanyQueryModel = { UserId: this.currentUser.UserId, IsDeleted: false, StatusId: '1' };
    this.companyService.getAllCompanies(query).pipe(takeUntil(this.onDestroy$)).subscribe(data => {
      if (data) {
        if (data.ParentId == null) {
          // process parent company details
          this.companies.push(data);
        }
        this.companies.forEach((currentItem, currentIndex) => {
          // add if does not exist else update
          if (currentItem.CompanyId === data.CompanyId) {
            this.companies[currentIndex] = data;
          } else {
            this.companies.push(data);
          }

          // process sub branches
          if (data.SubBranches) {
            data.SubBranches.forEach(sub => {
              this.companies.push(sub);
            });
          }

        });

        this.companyService.updateCompaniesState(this.companies);
      }

    });
  }

}
