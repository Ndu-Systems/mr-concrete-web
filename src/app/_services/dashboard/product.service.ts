import { Injectable } from '@angular/core';
import { Product } from 'src/app/_models/product.model';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Property } from 'src/app/_models/property.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _products: BehaviorSubject<Product[]>;
  public products: Observable<Product[]>;
  url: string;
  _product: BehaviorSubject<Product>;
  public product: Observable<Product>;
  constructor(
    private http: HttpClient
  ) {
    this._products = new BehaviorSubject<Product[]>(JSON.parse(localStorage.getItem('products')) || []);
    this.products = this._products.asObservable();
    this._product = new BehaviorSubject<Product>(JSON.parse(localStorage.getItem('product')) || null);
    this.product = this._product.asObservable();
    this.url = environment.API_URL;
  }



  updateState(data: Product[]) {
    this._products.next(data);
    localStorage.setItem('products', JSON.stringify(data));
  }

  updateProductState(data: Product) {
    this._product.next(data);
    localStorage.setItem('product', JSON.stringify(data));
  }



  addProduct(data: Product): Observable<Product> {
    return this.http.post<any>(`${this.url}/api/product/add-product.php`, data);
  }


  getProductsByCompanyId(CompanyId) {
    return this.http.get<any>(`${this.url}/api/product/get-products-for-supplier.php?UserId=${CompanyId}`).subscribe(resp => {
      const products: Product[] = resp;
      this.updateState(products);
    });
  }
  updateProduct(data: Product) {
    return this.http.post<any>(`${this.url}/api/product/update-product.php`, data);
  }
  updateProperty(data: Property) {
    return this.http.post<any>(`${this.url}/api/productproperty/update-productproperty.php`, data).subscribe(data => {
      console.log('Property Updated', data);
    });
  }
}
