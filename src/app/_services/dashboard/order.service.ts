import { Injectable } from '@angular/core';
import { Order } from 'src/app/_models/order.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { OrderView } from 'src/app/_models/orderview.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  url: string;

  private ordersBehaviorSubject: BehaviorSubject<Order[]>;
  public ordersObservable: Observable<Order[]>;

  private orderBehaviorSubject: BehaviorSubject<Order>;
  public orderObservable: Observable<Order>;

  private viewOrderBehaviorSubject: BehaviorSubject<Order>;
  public viewOrdeObservable: Observable<Order>;


  constructor(
    private http: HttpClient
  ) {
    this.ordersBehaviorSubject = new BehaviorSubject<Order[]>(JSON.parse(localStorage.getItem('orders')) || []);
    this.ordersObservable = this.ordersBehaviorSubject.asObservable();

    this.orderBehaviorSubject = new BehaviorSubject<Order>(JSON.parse(localStorage.getItem('order')) || null);
    this.orderObservable = this.orderBehaviorSubject.asObservable();

    this.viewOrderBehaviorSubject = new BehaviorSubject<Order>(JSON.parse(localStorage.getItem('vieworder')) || null);
    this.viewOrdeObservable = this.viewOrderBehaviorSubject.asObservable();
    this.url = environment.API_URL;
  }

  public getCurrentOrder(): Order {
    return this.viewOrderBehaviorSubject.value;
  }

  addOrder(data: Order): Observable<Order> {
    return this.http.post<any>(`${this.url}/api/order/add-order.php`, data);
  }

  getOrderByUserId(userId: string) {
    return this.http.get<any>(`${this.url}/api/order/get-order-user.php?UserId=${userId}`).subscribe(data => {
      if (data) {
        this.updateState(data);
      }
    });
  }
  getCustomerByUserId(customerId: string) {
    return this.http.get<any>(`${this.url}/api/order/get-order-by-customer-id.php?CustomerId=${customerId}`).subscribe(data => {
      if (data) {
        this.updateState(data);
      }
    });
  }

  updateState(data: Order[]) {
    this.ordersBehaviorSubject.next(data);
    localStorage.setItem('orders', JSON.stringify(data));
  }

  setOrderState(order: Order) {
    if (order) {
      this.orderBehaviorSubject.next(order);
      localStorage.setItem('order', JSON.stringify(order));
    }
  }
  setViewOrderState(order: Order) {
    if (order) {
      this.viewOrderBehaviorSubject.next(order);
      localStorage.setItem('vieworder', JSON.stringify(order));
    }
  }
  initOrderState() {

    const order: Order = {
      CustomerId: '',
      SupplierId: '',
      ProjectNumber: 'na',
      DeliveryDate: '',
      DeliveryTime: '',
      DeliveryAddress: '',
      SpecialInstructions: '',
      Total: 0,
      CrateUserId: '',
      ModifyUserId: '',
      StatusId: 1,
      ShowCart: false,
      Orderproducts: []
    };
    this.orderBehaviorSubject.next(order);
    localStorage.setItem('order', JSON.stringify(order));

  }
  clearOrderState() {
    this.orderBehaviorSubject.next(null);
    localStorage.setItem('order', null);

  }

  calculateTotal(order: Order) {
    let total = 0;
    order.Orderproducts.forEach(item => {
      total += Number(item.Quantity) * Number(item.Price);
    });
    order.Total = total;
    return order;
  }
}
