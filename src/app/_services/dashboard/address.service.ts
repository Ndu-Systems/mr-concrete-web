import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AddressModel, AddressQueryModel, UserModel } from 'src/app/_models';
import { HttpClient } from '@angular/common/http';
import { ADDRESS_VIEW, ADDRESSLIST_VIEW } from 'src/app/_shared';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private _address: BehaviorSubject<AddressModel>;
  private _addressList: BehaviorSubject<AddressModel[]>;
  public address: Observable<AddressModel>;
  public addressList: Observable<AddressModel[]>;
  url: string;
  constructor(
    private http: HttpClient,
  ) {
    this._address = new BehaviorSubject<AddressModel>(JSON.parse(localStorage.getItem(ADDRESS_VIEW)));
    this._addressList = new BehaviorSubject<AddressModel[]>(JSON.parse(localStorage.getItem(ADDRESSLIST_VIEW)));
    this.address = this._address.asObservable();
    this.addressList = this._addressList.asObservable();
    this.url = environment.API_URL;
  }

  updateAddressState(model: AddressModel) {
    this._address.next(model);
    localStorage.setItem(ADDRESS_VIEW, JSON.stringify(model));
  }

  public get getCurrentAddress(): AddressModel { return this._address.value; }

  updateAddressListState(model: AddressModel[]) {
    this._addressList.next(model);
    localStorage.setItem(ADDRESSLIST_VIEW, JSON.stringify(model));
  }

  public get getCurrentAddressList(): AddressModel[] { return this._addressList.value; }

  getAddressForUser(model: AddressQueryModel): Observable<AddressModel[]> {
    return this.http.post<AddressModel[]>(`${this.url}/api/address/get-address-for-user.php`, model);
  }

  addAddress(model: AddressModel): Observable<AddressModel> {
    return this.http.post<AddressModel>(`${this.url}/api/address/add-address.php`, model);
  }

  updateAddress(model: AddressModel): Observable<AddressModel> {
    return this.http.post<AddressModel>(`${this.url}/api/address/update-address.php`, model);

  }

}
