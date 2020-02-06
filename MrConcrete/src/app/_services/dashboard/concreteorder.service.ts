import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrderView } from 'src/app/_models/orderview.model';

@Injectable({
  providedIn: 'root'
})
export class ConcreteorderService {
  url: string;
  private _orders: BehaviorSubject<OrderView[]>;
  public orders: Observable<OrderView[]>;
  constructor(
    private http: HttpClient,
  ) {
    this._orders = new BehaviorSubject<OrderView[]>(JSON.parse(localStorage.getItem('orders')) || []);
    this.orders = this._orders.asObservable();
    this.url = environment.API_URL;
  }

  public get orderViewValue(): OrderView[] {
    return this._orders.value;
  }
  apendState(data: OrderView) {
    const state = this.orderViewValue || [];
    state.push(data);
    this._orders.next(state);
    localStorage.setItem('orders', JSON.stringify(state));

  }
  setState(data: OrderView[]) {
    this._orders.next(data);
    localStorage.setItem('orders', JSON.stringify(data));

  }
  createOrder(data): Observable<any> {
    return this.http.post<any>(`${this.url}/api/concreteorder/order.php`, data);
  }
  getOrders(userId: string) {
    return this.http.get<OrderView[]>(`${this.url}/api/concreteorder/get-concreteorders.php?UserId=${userId}`).subscribe(resp => {
      const data: OrderView[] = resp;
      if (data) {
        this.setState(data);
      }
    }, error => {
      console.log(error);
    });
  }
}
