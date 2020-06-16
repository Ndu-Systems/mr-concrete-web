import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/_services';
import { CompanyModel } from 'src/app/_models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-select-supplier',
  templateUrl: './select-supplier.component.html',
  styleUrls: ['./select-supplier.component.scss']
})
export class SelectSupplierComponent implements OnInit {
  companies$: Observable<CompanyModel[]>;
  selectCompany: CompanyModel;
  showSelectedItem: boolean;
  showAllItems: boolean;
  constructor(private companyService: CompanyService) { }

  ngOnInit() {
    this.companies$ = this.companyService.detailedCompaniesObservable;
    this.companyService.getDetailedCompanies();
    this.companyService.detailedCompanyObservable.subscribe(company => {
      if (company && company.CompanyId) {
        this.selectCompany = company;
        this.showSelectedItem = true;
      } else {
        this.showAllItems = true;
      }
    });
  }

  select(company: CompanyModel) {
    this.companyService.selectSupplier(company);
    this.selectCompany = company;
    this.showSelectedItem = true;
    this.showAllItems = false;
  }
  changeCompany() {
    this.companyService.selectSupplier(null);
    this.selectCompany = null;
    this.showSelectedItem = false;
    this.showAllItems = true;
  }

}
