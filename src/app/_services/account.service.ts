import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel, SignInModel, SignUpModel, TokenModel, ChangePasswordModel, EmailGetRequestModel } from '../_models';
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

  updateUserState(user: UserModel) {
    this._user.next(user);
    localStorage.setItem(CURRENT_USER, JSON.stringify(user));
  }

  signIn(data: SignInModel): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.url}/api/accounts/sign-in.php`, data)
      .pipe(map(response => {
        if (response.Email) {
          this.messageService.add({
            severity: 'success',
            summary: `Success!`,
            detail: 'User signed in successfully',
            life: 2000
          });
          localStorage.setItem(CURRENT_USER, JSON.stringify(response));
          this._user.next(response);
        } else {
          this.messageService.add({
            severity: 'error',
            summary: `Error`,
            detail: 'Invalid email/password entered',
            life: 2000
          });
        }
        return response;
      }, error => {
        this.messageService.add({
          severity: 'Error',
          summary: `Oops!`,
          detail: 'Something went wrong, try again later.',
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

  changePassword(data: ChangePasswordModel) {
    return this.http.post<UserModel>(`${this.url}/api/accounts/change-password.php`, data);

  }

  generateToken(data: EmailGetRequestModel) {
    return this.http.post<UserModel>(`${this.url}/api/accounts/generate-token.php`, data);

  }
  signOut() {
    localStorage.removeItem(CURRENT_USER);
    this._user.next(null);
    localStorage.clear();
    this.routTo.navigate(['/login']);
  }

  // link generation here
  generateAccountActivationReturnLink(email: string, token: string) {
    return `${environment.BASE_URL}/login?token=${token}`;
  }
  generateForgotPasswordReturnLink(token: string) {
    return `${environment.BASE_URL}/reset-password?token=${token}`;
  }

}
