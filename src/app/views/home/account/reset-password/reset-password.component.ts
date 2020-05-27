import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TokenModel, ChangePasswordModel } from 'src/app/_models';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AccountService } from 'src/app/_services';
import { LocationStrategy } from '@angular/common';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  token;
  rForm: FormGroup;
  hidePassword = true;
  error: string;
  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private routeTo: Router,
    private route: ActivatedRoute,
    private location: LocationStrategy,
    private messageService: MessageService,

  ) { }

  ngOnInit() {

    this.rForm = this.fb.group({
      Email: new FormControl(
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])
      ),
      Password: [null, Validators.required],
      ConfirmPassword: [null, Validators.required],
      TypeOfUser: [null]
    });
    const baseUrlMain: string = (this.location as any)._platformLocation.location.href;
    this.token = baseUrlMain.substring(baseUrlMain.indexOf('=') + 1);
  }

  getUserByToken() {
    if (!this.token) {
      this.errorMessage('You should not be here');
      setTimeout(() => {
        this.routeTo.navigate(['forgot-password']);
      }, 2000);
    }
    const tokenModel: TokenModel = { Token: this.token };

    this.accountService.getUserByToken(tokenModel);
  }
  errorMessage(message: string) {
    this.messageService.add({
      severity: 'warn',
      summary: 'Oops',
      detail: message,
      life: 7000
    });
  }

  successMassage(msg: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Password updated successfully',
      detail: msg,
      life: 7000
    });
  }

  onSubmit(model: ChangePasswordModel) {
    if (model.ConfirmPassword !== model.Password) {
      this.errorMessage('Password(s) do not match, Please try again');
      return;
    }
    this.accountService.changePassword(model).subscribe(data => {
      if (data) {
        this.successMassage('please login with your new credentials');
        setTimeout(() => {
          this.routeTo.navigate(['/login']);
        }, 2000);
      } else {
        this.errorMessage('something went wrong, please try again later');
        this.routeTo.navigate(['/']);
      }
    });
  }
}
