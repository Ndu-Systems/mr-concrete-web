import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DeliveryModel, DeliveryQueryModel } from 'src/app/_models';
import { HttpClient } from '@angular/common/http';
import { DELIVERIES_VIEW, DELIVERY_VIEW } from 'src/app/_shared';
import { NotificationService } from '../communication';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  private _deliveries: BehaviorSubject<DeliveryModel[]>;
  public deliveries: Observable<DeliveryModel[]>;
  private _delivery: BehaviorSubject<DeliveryModel>;
  public delivery: Observable<DeliveryModel>;

  url: string;

  constructor(
    private http: HttpClient,
    private messageService: NotificationService
  ) {
    this._deliveries = new BehaviorSubject<DeliveryModel[]>(JSON.parse(localStorage.getItem(DELIVERIES_VIEW)) || []);
    this.deliveries = this._deliveries.asObservable();
    this.url = environment.API_URL;
    this._delivery = new BehaviorSubject<DeliveryModel>(JSON.parse(localStorage.getItem(DELIVERY_VIEW)));
    this.delivery = this._delivery.asObservable();
  }

  // public gets
  public get CurrentDeliveriesValue(): DeliveryModel[] { return this._deliveries.value; }

  public get CurrentDeliveryValue(): DeliveryModel { return this._delivery.value; }

  // update the current Observable state.
  updateDeliveriesState(data: DeliveryModel[]) {
    this._deliveries.next(data);
    localStorage.setItem(DELIVERIES_VIEW, JSON.stringify(data));
  }

  updateDeliveryState(data: DeliveryModel) {
    this._delivery.next(data);
    localStorage.setItem(DELIVERY_VIEW, JSON.stringify(data));
  }

  getCompanyDeliveries(query: DeliveryQueryModel | any) {
    return this.http.post<DeliveryModel[]>(`${this.url}/api/orderdelivery/get-by-companyid.php`, query).subscribe(resp => {
      const orderDeliveries: DeliveryModel[] = resp;
      this.updateDeliveriesState(orderDeliveries);
    }, error => {
      this.messageService.dangerMessage('Something went wrong', 'please try again later...');
    });
  }

  getUserDeliveries(query: DeliveryQueryModel) {
    return this.http.post<DeliveryModel[]>(`${this.url}/api/orderdelivery/get-by-userid.php`, query).subscribe(resp => {
      const orderDeliveries: DeliveryModel[] = resp;
      this.updateDeliveriesState(orderDeliveries);
    }, error => {
      this.messageService.dangerMessage('Something went wrong', 'please try again later...');
    });
  }

  AddDelivery(model: DeliveryModel) {
    this.http.post<DeliveryModel>(`${this.url}/api/orderdelivery/add-order-delivery.php`, model).subscribe(data => {
      let deliveries: DeliveryModel[] = JSON.parse(localStorage.getItem(DELIVERIES_VIEW));
      if (deliveries === undefined) {
        deliveries = [];
      }
      deliveries.push(data);
      this.updateDeliveriesState(deliveries);
    });
  }

  updateDelivery(model: DeliveryModel) {
    this.http.put<DeliveryModel>(`${this.url}/api/orderdelivery/update-order-delivery.php`, model).subscribe(data => {
      let deliveries: DeliveryModel[] = JSON.parse(localStorage.getItem(DELIVERIES_VIEW));
      if (deliveries === undefined) {
        deliveries = [];
        deliveries.push(data);
      } else {
        deliveries.forEach((item, index) => {
          if (item.Id === data.Id) {
            deliveries[index] = data;
          }
        });
      }
      this.updateDeliveriesState(deliveries);
    });
  }


}
