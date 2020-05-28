import { SEND_EMAIL_RESET_PASSWORD, SEND_EMAIL_ACTIVATE_ACCOUNT } from './../../_shared/email.constants';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Email } from 'src/app/_models';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }

  sendAccountActivationEmail(data: Email): Observable<any> {
    return this.http.post<any>(SEND_EMAIL_ACTIVATE_ACCOUNT, data);
  }

  sendResetPasswordEmail(data: Email): Observable<any> {
    return this.http.post<any>(SEND_EMAIL_RESET_PASSWORD, data);
  }

}
