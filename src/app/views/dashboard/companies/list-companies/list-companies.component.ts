import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CompanyModel, Placeholder, NavigationModel, ConfirmModel, UserModel } from 'src/app/_models';
import { Router } from '@angular/router';
import { ApiService, NotificationService, UserService, CompanyService, AccountService } from 'src/app/_services';

@Component({
  selector: 'app-list-companies',
  templateUrl: './list-companies.component.html',
  styleUrls: ['../companies.component.scss']
})
export class ListCompaniesComponent implements OnInit {
  @Input() companies: CompanyModel[];
  @Input() currentUser: UserModel;

  @Output() deletionCompleted: EventEmitter<CompanyModel> = new EventEmitter();

  itemToDelete: CompanyModel;

  placeHolder: Placeholder = {
    imageUrl: 'assets/images/dashboard/placeholders/default.svg',
    message: 'No companies found.',
    link: '/dashboard/add-company',
    linkLabel: 'Add company'
  };
  confirmModel: ConfirmModel = {
    Heading: 'Are you sure?',
    Description: 'This record will not be visible on the system.',
    ButtonLabel: 'Yes, delete',
    Image: 'assets/images/dashboard/action-card/delete.svg'
  };

  showConfirmDeleteModal: boolean;

  constructor(
    private apiService: ApiService,
    private companyService: CompanyService,
    private messageService: NotificationService,
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

  deleteItem(item) {
    this.itemToDelete = item;
    this.showConfirmDeleteModal = !this.showConfirmDeleteModal;
  }

  performDelete() {
    this.itemToDelete.IsDeleted = true;
    this.itemToDelete.StatusId = '2'; // inactive status
    this.companyService.updateCompany(this.itemToDelete).subscribe(data => {
      this.messageService.dangerMessage('Record deleted', 'Record has been deleted');
      this.deletionCompleted.emit(this.itemToDelete);
      this.showConfirmDeleteModal = !this.showConfirmDeleteModal;
    });
  }

}
