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

  private _supplier: BehaviorSubject<Supplier>;
  public supplier: Observable<Supplier>;

  constructor(
    private http: HttpClient,
  ) {
    this._suppliers = new BehaviorSubject<Supplier[]>(JSON.parse(localStorage.getItem('suppliers')) || []);
    this.suppliers = this._suppliers.asObservable();
    this.url = environment.API_URL;
    this._supplier = new BehaviorSubject<Supplier>(JSON.parse(localStorage.getItem('supplier')));
    this.supplier = this._supplier.asObservable();
  }

  public get suppliersValue(): Supplier[] {
    return this._suppliers.value;
  }

  appendState(data: Supplier) {

    let state = this.suppliersValue || [];
    const existingSupplier = state.find(x => x.SupplierId === data.SupplierId);
    if (existingSupplier) {
      state = state.filter(x => x.SupplierId !== data.SupplierId);
      state.push(data);
    } else {
      state.push(data);
    }
    // sort
    state.sort((x, y) => {
      return new Date(y.CreateDate).getTime() - new Date(x.CreateDate).getTime();
    });
    this._suppliers.next(state);
    localStorage.setItem('suppliers', JSON.stringify(state));

  }

  setState(data: Supplier[]) {
    data.sort((x, y) => {
      return new Date(y.CreateDate).getTime() - new Date(x.CreateDate).getTime();
    });
    this._suppliers.next(data);
    localStorage.setItem('suppliers', JSON.stringify(data));
    this.dataStore.suppliers = data;
    this._suppliers.next(Object.assign({}, this.dataStore).suppliers);
  }

  updateCurrentSupplier(supplier: Supplier) {
    this._supplier.next(supplier);
    localStorage.setItem('supplier', JSON.stringify(supplier));
  }

  removeCurrentCategory() {
    localStorage.removeItem('supplier');
  }
  addSupplier(data: Supplier) {
    return this.http.post<any>(`${this.url}/api/supplier/add-supplier.php`, data).subscribe(resp => {
      const Supplier: Supplier = resp;
      this.appendState(Supplier);
    }, error => {
      console.log(error);
    });
  }

  updateSupplier(supplier: Supplier) {
    this.http.put<Supplier>(`${this.url}/api/supplier/edit-supplier.php`, JSON.stringify(supplier))
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

  getSuppliers(statusId: string | number) {
    return this.http.get<Supplier[]>(`${this.url}/api/supplier/get-suppliers.php?StatusId=${statusId}`).subscribe(resp => {
      const suppliers: Supplier[] = resp;
      localStorage.setItem('suppliers', JSON.stringify(suppliers));
      this.setState(suppliers);
      // this.dataStore.suppliers = suppliers;
      // this._suppliers.next(Object.assign({}, this.dataStore).suppliers);
    }, error => {
      console.log(error);
    });
  }

  getSupplier(email: string): Observable<Supplier> {
    return this.http.get<Supplier>(`${this.url}/api/supplier/get-supplier.php?Email=${email}`);
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
