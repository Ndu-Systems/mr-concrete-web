import { Component, OnInit, Input } from '@angular/core';
import { CompanyModel, Placeholder, NavigationModel } from 'src/app/_models';
import { Router } from '@angular/router';
import { ApiService, NotificationService, UserService, CompanyService } from 'src/app/_services';

@Component({
  selector: 'app-list-companies',
  templateUrl: './list-companies.component.html',
  styleUrls: ['../companies.component.scss']
})
export class ListCompaniesComponent implements OnInit {
  @Input() companies: CompanyModel[];
  placeHolder: Placeholder = {
    imageUrl: 'assets/images/dashboard/placeholders/default.svg',
    message: 'No companies found.',
    link: '/dashboard/add-company',
    linkLabel: 'Add company'
  };
  constructor(
    private userService: UserService,
    private apiService: ApiService,
    private companyService: CompanyService,
    private routTo: Router
  ) { }

  ngOnInit() {
  }
  onCardClick(item: CompanyModel) {
    this.companyService.updateCompanyState(item);
    const nav: NavigationModel = {
      heading: 'View company',
      subheading: 'See company details here',
      returnUrl: '/dashboard/companies'
    };
    this.apiService.updateNavState(nav);
    this.routTo.navigate(['/dashboard/view-company']);
  }
}
