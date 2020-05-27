import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel, SignInModel, SignUpModel, TokenModel } from '../_models';
import { HttpClient } from '@angular/common/http';
import { CURRENT_USER } from '../_shared';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  // tslint:disable-next-line: variable-name
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

  signIn(data: SignInModel): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.url}/api/accounts/sign-in.php`, data)
      .pipe(map(response => {
        if (response) {
          localStorage.setItem(CURRENT_USER, JSON.stringify(response));
          this._user.next(response);
        }
        return response;
      }, error => {
        this.messageService.add({
          severity: 'success',
          summary: `Success!`,
          detail: 'Supplier added successfully',
          life: 1000
        });
      }));
  }

  signUp(data: SignUpModel): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.url}/api/accounts/sign-up.php`, data)
      .pipe(map(response => {
        if (response) {
          localStorage.setItem(CURRENT_USER, JSON.stringify(response));
          this._user.next(response);
        }
        return response;
      }));
  }

  activateUser(data: TokenModel): Observable<any> {
    return this.http.post<any>(`${this.url}/api/accounts/activate-user-account.php`, data);
  }

  getUserByToken(data: TokenModel): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.url}/api/accounts/get-user-by-token.php`, data);
  }

  signOut() {
    localStorage.removeItem(CURRENT_USER);
    this._user.next(null);
    this.routTo.navigate(['/']);
  }

  // link generation here
  generateAccountActivationReturnLink(email: string, token: string) {
    return `${this.url}/login?token=${token}`;
  }
  generateForgotPasswordReturnLink(token: string) {
    return `${this.url}/reset-password?token=${token}`;
  }

}
