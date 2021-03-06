import { Injectable } from '@angular/core';
import { CompanyModel, CompanyQueryModel } from 'src/app/_models';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { COMPANIES_VIEW, COMPANY_VIEW, DETAILED_COMPANIES, DETAILED_COMPANY } from 'src/app/_shared';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private _companies: BehaviorSubject<CompanyModel[]>;
  public companies: Observable<CompanyModel[]>;
  private _company: BehaviorSubject<CompanyModel>;
  private company: Observable<CompanyModel>;

  private detailedCompaniesBehaviorSubject: BehaviorSubject<CompanyModel[]>;
  public detailedCompaniesObservable: Observable<CompanyModel[]>;

  private detailedCompanyBehaviorSubject: BehaviorSubject<CompanyModel>;
  public detailedCompanyObservable: Observable<CompanyModel>;
  url: string;

  constructor(private http: HttpClient, private productService: ProductService) {
    this._companies = new BehaviorSubject<CompanyModel[]>(JSON.parse(localStorage.getItem(COMPANIES_VIEW)) || []);
    this.companies = this._companies.asObservable();

    this._company = new BehaviorSubject<CompanyModel>(JSON.parse(localStorage.getItem(COMPANY_VIEW)) || null);
    this.company = this._company.asObservable();

    this.detailedCompaniesBehaviorSubject = new BehaviorSubject<CompanyModel[]>(JSON.parse(localStorage.getItem(DETAILED_COMPANIES)) || []);
    this.detailedCompaniesObservable = this.detailedCompaniesBehaviorSubject.asObservable();

    this.detailedCompanyBehaviorSubject = new BehaviorSubject<CompanyModel>(JSON.parse(localStorage.getItem(DETAILED_COMPANY)) || null);
    this.detailedCompanyObservable = this.detailedCompanyBehaviorSubject.asObservable();

    this.url = environment.API_URL;
  }

  // Observables local storage updates

  public get CurrentCompanyValue(): CompanyModel {
    return this._company.value;
  }
  // companies
  updateCompaniesState(data: CompanyModel[]) {
    this._companies.next(data);
    localStorage.setItem(COMPANIES_VIEW, JSON.stringify(data));
  }

  // company
  updateCompanyState(data: CompanyModel) {
    this._company.next(data);
    localStorage.setItem(COMPANY_VIEW, JSON.stringify(data));
  }

  updateDetailedCompanyState(data: CompanyModel) {
    this.detailedCompanyBehaviorSubject.next(data);
    localStorage.setItem(DETAILED_COMPANY, JSON.stringify(data));
  }

  // add company
  addCompany(data: CompanyModel): Observable<CompanyModel> {
    return this.http.post<CompanyModel>(`${this.url}/api/companies/add-company.php`, JSON.stringify(data));
  }


  // update company
  updateCompany(data: CompanyModel): Observable<CompanyModel> {
    return this.http.post<CompanyModel>(`${this.url}/api/companies/update-company.php`, JSON.stringify(data));
  }

  // get all companies
  getAllCompanies(data: CompanyQueryModel): Observable<CompanyModel> {
    return this.http.post<CompanyModel>(`${this.url}/api/companies/get-all.php`, JSON.stringify(data));
  }

  // get company by id
  getById(data: CompanyQueryModel) {
    return this.http.post<CompanyModel>(`${this.url}/api/companies/get-by-id.php`, JSON.stringify(data)).subscribe(response => {
      const company: CompanyModel = response;
      this.updateCompanyState(company);
    });
  }

  getDetailedCompanies() {
    this.http.get<CompanyModel[]>(`${this.url}/api/companies/get-details-companies.php`).subscribe(data => {
      this.detailedCompaniesBehaviorSubject.next(data);
    });
  }

  selectSupplier(company: CompanyModel) {
    this.updateDetailedCompanyState(company);
    if (company) {
      this.productService.updateState(company.Products);
    } else {
      this.productService.updateState([]);
    }
  }

}
