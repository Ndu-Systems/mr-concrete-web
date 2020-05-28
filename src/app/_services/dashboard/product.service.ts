import { Injectable } from '@angular/core';
import { Product } from 'src/app/_models/product.model';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject } from 'MrConcrete/node_modules/rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _products: BehaviorSubject<Product[]>;
  public products: Observable<Product[]>;
  url: string;
  constructor(
    private http: HttpClient
  ) {
    this._products = new BehaviorSubject<Product[]>(JSON.parse(localStorage.getItem('products')) || []);
    this.products = this._products.asObservable();
    this.url = environment.API_URL;
  }



  updateState(data: Product[]) {
    this._products.next(data);
    localStorage.setItem('products', JSON.stringify(data));
  }



  addProduct(data: Product): Observable<Product> {
    return this.http.post<any>(`${this.url}/api/product/add-product.php`, data);
  }


  getProductsByUserId(userId) {
    return this.http.get<any>(`${this.url}/api//product/get-products-for-supplier.php?UserId=${userId}`).subscribe(resp => {
      const products: Product[] = resp;
      this.updateState(products);

    });
  }

}
