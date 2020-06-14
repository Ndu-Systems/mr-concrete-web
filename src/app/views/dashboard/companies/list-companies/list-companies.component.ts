import { Component, OnInit, Input } from '@angular/core';
import { CompanyModel, Placeholder } from 'src/app/_models';

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
  constructor() { }

  ngOnInit() {
  }

}
