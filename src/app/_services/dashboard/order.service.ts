import { Injectable } from '@angular/core';
import { Order } from 'src/app/_models/order.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  url: string;
  private _orders: BehaviorSubject<Order[]>;
  public orders: Observable<Order[]>;


  constructor(
    private http: HttpClient
  ) {
    this._orders = new BehaviorSubject<Order[]>(JSON.parse(localStorage.getItem('orders')) || []);
    this.orders = this._orders.asObservable();
    this.url = environment.API_URL;
  }



  addOrder(data: Order): Observable<Order> {
    return this.http.post<any>(`${this.url}/api/order/add-order.php`, data);
  }

  getOrderByUserId(userId: string) {
    return this.http.get<any>(`${this.url}/api/order/get-order-user.php?UserId=${userId}`).subscribe(data => {
      if (data) {
        this.updateState(data);
      }
    })
  }

  updateState(data: Order[]) {
    this._orders.next(data);
    localStorage.setItem('orders', JSON.stringify(data));
  }
}
