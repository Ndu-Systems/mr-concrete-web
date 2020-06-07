import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Item, NavigationModel } from '../_models';
import { CURRENT_NAV } from '../_shared';

// THIS IS TESTING FOR PWA ** FOR LEARNING PURPOSES ONLY **

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private apiUrl = 'https://www.techiediaries.com/api/data.json';
  private _navigate: BehaviorSubject<NavigationModel>;
  private navigate: Observable<NavigationModel>;
  constructor(private http: HttpClient) {
    this._navigate = new BehaviorSubject<NavigationModel>(JSON.parse(localStorage.getItem(CURRENT_NAV)));
    this.navigate = this._navigate.asObservable();
   }

  public get CurrentNav(): NavigationModel {
    return this._navigate.value;
  }

  updateNavState(model: NavigationModel) {
    this._navigate.next(model);
    localStorage.setItem(CURRENT_NAV, JSON.stringify(model));
  }

  get(): Observable<Item[]> {
    return this.http.get(this.apiUrl) as Observable<Item[]>;
  }

}
