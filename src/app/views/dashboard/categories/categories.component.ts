import { ConfirmationService, Message } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { CateroryService, AccountService } from 'src/app/_services';
import { Caterory, UserModel, Placeholder } from 'src/app/_models';
import { ActionButton } from '../shared/constants/actions';
import { Router } from '@angular/router';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  heading = 'Categories';
  subheading = 'A list of industry categories';
  categories: Caterory[] = [];
  dummyDate = Date.now();

  actionButton: ActionButton = {
    link: '/dashboard/add-category',
    label: 'add category'
  };
  placeHolder: Placeholder = {
    imageUrl: 'assets/images/dashboard/placeholders/category.svg',
    message: 'There are no categories at the moment.',
    link: '/dashboard/add-category',
    linkLabel: 'Create a category'
  };
  currentUser: UserModel;
  msgs: Message[] = [];

  constructor(
    private categoryService: CateroryService,
    private confirmationService: ConfirmationService,
    private accountService: AccountService,
    private routeTo: Router
  ) { }

  ngOnInit() {
    this.categoryService.getCateries();
    this.categoryService.categories.subscribe(data => this.categories = data);
    this.currentUser = this.accountService.CurrentUserValue;

  }

  updateCategory(category: Caterory) {
    this.categoryService.updateCurrentCategory(category);
    this.routeTo.navigate(['/dashboard/edit-category']);
  }
  archiveCategory(category: Caterory) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation Action',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        category.StatusId = '2';
        category.ModifyUserId = this.currentUser.UserId;
        this.categoryService.updateCategory(category);
        this.msgs = [{ severity: 'warn', summary: 'Archived', detail: 'Category archived successfully.' }];
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'Have rejected the archive action' }];
      }
    });
  }
}
