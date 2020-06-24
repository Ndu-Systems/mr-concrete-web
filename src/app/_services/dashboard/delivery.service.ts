import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DeliveryModel } from 'src/app/_models';
import { HttpClient } from '@angular/common/http';

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
  private http: HttpClient
) { }

}
