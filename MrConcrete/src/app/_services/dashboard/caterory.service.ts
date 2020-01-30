import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Caterory } from 'src/app/_models';

@Injectable({
  providedIn: 'root'
})
export class CateroryService {

  private _categories: BehaviorSubject<Caterory[]>;
  public categories: Observable<Caterory[]>;
  url: string;

  private dataStore: {
    categories: Caterory[]
  } = { categories: [] };

  private _category: BehaviorSubject<Caterory>;
  public category: Observable<Caterory>;

  constructor(
    private http: HttpClient,
  ) {
    this._categories = new BehaviorSubject<Caterory[]>(JSON.parse(localStorage.getItem('categories')) || []);
    this.categories = this._categories.asObservable();
    this.url = environment.API_URL;
    this._category = new BehaviorSubject<Caterory>(JSON.parse(localStorage.getItem('category')));
    this.category = this._category.asObservable();
  }

  public get categoriesValue(): Caterory[] {
    return this._categories.value;
  }
  apendState(data: Caterory) {
    const state = this.categoriesValue || [];
    state.push(data);
    this._categories.next(state);
  }

  updateCurrentCategory(category: Caterory) {
    this._category.next(category);
    localStorage.setItem('category', JSON.stringify(category));
  }

  removeCurrentCategory() {
    localStorage.removeItem('category');
  }
  addCaterory(data: Caterory) {
    return this.http.post<any>(`${this.url}/api/catergory/add-catergory.php`, data).subscribe(resp => {
      const caterory: Caterory = resp;
      this.apendState(caterory);
    }, error => {
      console.log(error);
    });
  }

  updateCategory(category: Caterory) {
    this.http.put<Caterory>(`${this.url}/api/catergory/edit-catergory.php`, JSON.stringify(category))
      .subscribe(data => {
        this.dataStore.categories.forEach((item, index) => {
          if (item.CatergoryId === data.CatergoryId) {
            this.dataStore.categories[index] = data;
          }
        });
        this.dataStore.categories.sort((x, y) => {
          return new Date(y.CreateDate).getTime() - new Date(x.CreateDate).getTime();
        });
        this._categories.next(Object.assign({}, this.dataStore).categories);
      }, error => console.log('Could not update category'));
  }

  getCateries(companyId) {
    return this.http.get<Caterory[]>(`${this.url}/api/category/get-categories.php?CompanyId=${companyId}`).subscribe(resp => {
      const caterory: Caterory[] = resp;
      localStorage.setItem('categories', JSON.stringify(caterory));
      this._categories.next(caterory);
      this.dataStore.categories = resp;
      this._categories.next(Object.assign({}, this.dataStore).categories);
    }, error => {
      console.log(error);
    });
  }


}
