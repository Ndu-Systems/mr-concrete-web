import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Supplier } from 'src/app/_models';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  private _suppliers: BehaviorSubject<Supplier[]>;
  public suppliers: Observable<Supplier[]>;
  url: string;

  private dataStore: {
    suppliers: Supplier[]
  } = { suppliers: [] };

  private _category: BehaviorSubject<Supplier>;
  public category: Observable<Supplier>;

  constructor(
    private http: HttpClient,
  ) {
    this._suppliers = new BehaviorSubject<Supplier[]>(JSON.parse(localStorage.getItem('suppliers')) || []);
    this.suppliers = this._suppliers.asObservable();
    this.url = environment.API_URL;
    this._category = new BehaviorSubject<Supplier>(JSON.parse(localStorage.getItem('supplier')));
    this.category = this._category.asObservable();
  }

  public get suppliersValue(): Supplier[] {
    return this._suppliers.value;
  }
  apendState(data: Supplier) {
    console.log(data);

    const state = this.suppliersValue || [];
    state.push(data);
    this._suppliers.next(state);
  }

  updateCurrentCategory(category: Supplier) {
    this._category.next(category);
    localStorage.setItem('supplier', JSON.stringify(category));
  }

  removeCurrentCategory() {
    localStorage.removeItem('supplier');
  }
  addSupplier(data: Supplier) {
    return this.http.post<any>(`${this.url}/api/supplier/add-supplier.php`, data).subscribe(resp => {
      const Supplier: Supplier = resp;
      this.apendState(Supplier);
    }, error => {
      console.log(error);
    });
  }

  updateSupplier(category: Supplier) {
    this.http.put<Supplier>(`${this.url}/api/supplier/edit-supplier.php`, JSON.stringify(category))
      .subscribe(data => {
        this.dataStore.suppliers.forEach((item, index) => {
          if (item.SupplierId === data.SupplierId) {
            this.dataStore.suppliers[index] = data;
          }
        });
        this.dataStore.suppliers.sort((x, y) => {
          return new Date(y.CreateDate).getTime() - new Date(x.CreateDate).getTime();
        });
        this._suppliers.next(Object.assign({}, this.dataStore).suppliers);
      }, error => console.log('Could not update supplier'));
  }

  getSuppliers() {
    return this.http.get<Supplier[]>(`${this.url}/api/supplier/get-supplies.php`).subscribe(resp => {
      const Supplier: Supplier[] = resp;
      localStorage.setItem('suppliers', JSON.stringify(Supplier));
      this._suppliers.next(Supplier);
      this.dataStore.suppliers = resp;
      this._suppliers.next(Object.assign({}, this.dataStore).suppliers);
    }, error => {
      console.log(error);
    });
  }

  getSupplier(supplierId: string, email: string): Observable<Supplier> {
    return this.http.get<Supplier>(`${this.url}/api/supplier/get-supplier.php?SupplierId=${supplierId}&Email=${email}`);
  }
  resetCardClass(suppliers: Supplier[]) {
    if (suppliers && suppliers.length) {
      suppliers.forEach(x => {
        x.Selected = 'no';
      });
      this._suppliers.next(suppliers);
    }
  }

}
