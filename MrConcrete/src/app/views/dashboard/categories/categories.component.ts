import { Component, OnInit } from '@angular/core';
import { CateroryService } from 'src/app/_services';
import { Caterory } from 'src/app/_models';
import { ActionButton } from '../shared/constants/actions';
import { Router } from '@angular/router';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  heading = 'Settings';
  subheading = 'Categories';
  categories: Caterory[] = [];
  actionButton: ActionButton = {
    link: '/dashboard/add-category',
    label: 'add category'
  };
  constructor(
    private categoryService: CateroryService,
    private routeTo: Router
  ) { }

  ngOnInit() {
    this.categoryService.getCateries();
    this.categoryService.categories.subscribe(data => this.categories = data);
  }

  updateCategory(category: Caterory) {
    this.categoryService.updateCurrentCategory(category);
    this.routeTo.navigate(['/dashboard/edit-category']);
  }
}
