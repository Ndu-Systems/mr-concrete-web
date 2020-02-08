import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel, SignInModel, SignUpModel } from '../_models';
import { HttpClient } from '@angular/common/http';
import { CURRENT_USER } from '../_shared';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private _user: BehaviorSubject<UserModel>;
  private user: Observable<UserModel>;
  url: string;
  constructor(
    private http: HttpClient,
  ) {
    this._user = new BehaviorSubject<UserModel>(JSON.parse(localStorage.getItem(CURRENT_USER)));
    this.user = this._user.asObservable();
    this.url = environment.API_URL;
  }

  public get CurrentUserValue(): UserModel {
    return this._user.value;
  }

  signIn(data: SignInModel): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.url}/api/users/sign-in.php`, data)
    .pipe(map(response => {
      if (response) {
        localStorage.setItem(CURRENT_USER, JSON.stringify(response));
        this._user.next(response);
      }
      return response;
    }));
  }

  signUp(data: SignUpModel): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.url}/api/users/sign-up.php`, data)
    .pipe(map(response => {
      if(response) {
        localStorage.setItem(CURRENT_USER, JSON.stringify(response));
        this._user.next(response);
      }
      return response;
    }));
  }
  signOut() {
    localStorage.removeItem(CURRENT_USER);
    this._user.next(null);
  }
}
