import { Injectable } from '@angular/core';
import { CompanyModel, CompanyQueryModel } from 'src/app/_models';
import { Observable, BehaviorSubject } from 'MrConcrete/node_modules/rxjs';
import { HttpClient } from '@angular/common/http';
import { LOCALE } from 'src/app/_shared';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private _companies: BehaviorSubject<CompanyModel[]>;
  public companies: Observable<CompanyModel[]>;
  private _company: BehaviorSubject<CompanyModel>;
  private company: Observable<CompanyModel>;
  locale = LOCALE;
  url: string;

  constructor(private http: HttpClient) {
    this._companies = new BehaviorSubject<CompanyModel[]>(JSON.parse(localStorage.getItem(this.locale.COMPANIES_LCLSTR)) || []);
    this.companies = this._companies.asObservable();
    this._company = new BehaviorSubject<CompanyModel>(JSON.parse(localStorage.getItem(this.locale.COMPANY_LCLSTR)) || null);
    this.company = this._company.asObservable();
    this.url = environment.API_URL;
  }

  // Observables local storage updates
  // companies
  updateCompaniesState(data: CompanyModel[]) {
    this._companies.next(data);
    localStorage.setItem(this.locale.COMPANIES_LCLSTR, JSON.stringify(data));
  }

  // company
  updateCompanyState(data: CompanyModel) {
    this._company.next(data);
    localStorage.setItem(this.locale.COMPANY_LCLSTR, JSON.stringify(data));
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
  getAllCompanies(data: CompanyQueryModel) {
    return this.http.post<CompanyModel[]>(`${this.url}/api/companies/get-all.php`, JSON.stringify(data)).subscribe(response => {
      const companies: CompanyModel[] = response;
      this.updateCompaniesState(companies);
    });
  }

 // get company by id
  getById(data: CompanyQueryModel) {
    return this.http.post<CompanyModel>(`${this.url}/api/companies/get-by-id.php`, JSON.stringify(data)).subscribe(response => {
      const company: CompanyModel = response;
      this.updateCompanyState(company);
    });
  }

}
