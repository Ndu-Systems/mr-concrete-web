import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserModel, Caterory } from 'src/app/_models';
import { AccountService, CateroryService } from 'src/app/_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {
  heading = 'Settings';
  subheading = 'Create a new category';
  rForm: FormGroup;
  currentUser: UserModel;
  actionButton: any = {
    link: '/dashboard/categories',
    label: 'View categories'
  };
  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private categoryService: CateroryService,
    private routeTo: Router
  ) { }

  ngOnInit() {
    this.currentUser = this.accountService.CurrentUserValue;
    this.rForm = this.fb.group({
      CategoryName: [null, Validators.required],
      CreateUserId: [this.currentUser.UserId],
      ModifyUserId: [this.currentUser.UserId],
      StatusId: [1]
    });
  }

  onSubmit(category: Caterory) {
    this.categoryService.addCaterory(category);
    this.categoryService.getCateries();
    this.routeTo.navigate(['/dashboard/categories']);
  }

}
