import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConcreteorderService {
  url: string;

  constructor(private http: HttpClient,
  ) {
  this.url = environment.API_URL;
  }
  createOrder(data): Observable<any> {
    return this.http.post<any>(`${this.url}/api/concreteorder/order.php`, data);
  }
}
