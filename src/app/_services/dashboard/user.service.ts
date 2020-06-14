import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel, EmailGetRequestModel, UserQueryModel } from 'src/app/_models';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { USER_VIEW } from 'src/app/_shared';

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
    this._user = new BehaviorSubject<UserModel>(JSON.parse(localStorage.getItem(USER_VIEW)));
    this.user = this._user.asObservable();
    this.url = environment.API_URL;
  }

  public get CurrentUserViewValue(): UserModel {
    return this._user.value;
  }
  updateUserViewState(user: UserModel) {
    this._user.next(user);
    localStorage.setItem(USER_VIEW, JSON.stringify(user));
  }
  getAllUsers(queryModel: UserQueryModel): Observable<UserModel[]> {
    return this.http.post<UserModel[]>(`${this.url}/api/users/get-all-users.php`, queryModel);
  }

  getUserByEmail(model: EmailGetRequestModel): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.url}/api/users/get-user-by-email.php`, model);
  }

  addUser(model: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.url}/api/users/add-user.php`, model);
  }

  updateUser(model: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.url}/api/users/update-user.php`, model);
  }

  clearCurrentUser() {
    this._user.next(null);
  }

}
