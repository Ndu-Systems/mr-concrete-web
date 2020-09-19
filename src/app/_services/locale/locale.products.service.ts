import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/_models';

@Injectable({
  providedIn: 'root'
})
export class LocaleProductsService {

  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>('assets/data-services/products.json').pipe(map(response => {
       return response;
    }));
  }

}
