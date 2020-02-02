import { Component, OnInit } from '@angular/core';
import { CateroryService } from 'src/app/_services';
import { Caterory } from 'src/app/_models';
import { ActionButton } from '../shared/constants/actions';
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
    private categoryService: CateroryService
  ) { }

  ngOnInit() {
    this.categories = this.categoryService.categoriesValue;
    this.categoryService.getCateries();
  }

}
