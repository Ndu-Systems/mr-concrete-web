import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel, EmailGetRequestModel } from 'src/app/_models';
import { HttpClient } from '@angular/common/http';
import { CURRENT_USER } from 'MrConcrete/src/app/_shared/constants';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _user: BehaviorSubject<UserModel>;
  private user: Observable<UserModel>;
  url: string;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private routTo: Router
  ) {
    this._user = new BehaviorSubject<UserModel>(JSON.parse(localStorage.getItem(CURRENT_USER)));
    this.user = this._user.asObservable();
    this.url = environment.API_URL;
  }

  public get CurrentUserValue(): UserModel {
    return this._user.value;
  }

  getUserByEmail(model: EmailGetRequestModel): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.url}/api/users/get-user-by-email.php`, model);
  }

  updateUser(model: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.url}/api/users/update-user.php`, model);
  }
}
