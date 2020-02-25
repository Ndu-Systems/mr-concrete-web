import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { CateroryService, AccountService } from 'src/app/_services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel, Caterory } from 'src/app/_models';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  heading = 'Settings';
  subheading = 'Edit category';
  rForm: FormGroup;
  currentUser: UserModel;
  category: Caterory;
  actionButton: any = {
    link: '/dashboard/categories',
    label: 'View categories'
  };
  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private messageService: MessageService,
    private categoryService: CateroryService,
    private routeTo: Router
  ) { }

  ngOnInit() {
    this.categoryService.category.subscribe(data => this.category = data);
    this.initForm();
  }
  initForm() {
    this.currentUser = this.accountService.CurrentUserValue;
    this.rForm = this.fb.group({
      CategoryId: [this.category.CategoryId],
      CategoryName: [this.category.CategoryName, Validators.required],
      CreateUserId: [this.category.CreateUserId],
      ModifyUserId: [this.currentUser.UserId],
      StatusId: [1]
    });
  }
  onSubmit(category: Caterory) {
    this.categoryService.updateCategory(category);
    this.messageService.add({
      severity: 'success',
      summary: `Success!`,
      detail: 'Category updated successfully',
      life: 1000
    });
    this.routeTo.navigate(['/dashboard/categories']);
  }

}
