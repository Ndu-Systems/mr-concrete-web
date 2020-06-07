import { Component, OnInit } from '@angular/core';
import { NavigationModel, UserModel, ChangePasswordModel } from 'src/app/_models';
import { ApiService, AccountService, NotificationService } from 'src/app/_services';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['../user-profile.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  nav: NavigationModel;
  rForm: FormGroup;
  hidePassword = true;
  user: UserModel;

  constructor(
    private fb: FormBuilder,
    private routeTo: Router,
    private accountService: AccountService,
    private messageService: NotificationService,
    private navService: ApiService
  ) { }

  ngOnInit() {
    this.nav = this.navService.CurrentNav;
    this.user = this.accountService.CurrentUserValue;

    this.rForm = this.fb.group({
      Email: new FormControl(
        this.user.Email,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])
      ),
      Password: [null, Validators.required],
      ConfirmPassword: [null, Validators.required],
    });

  }
  goBack() {
    this.routeTo.navigate([this.nav.returnUrl]);
  }

  onSubmit(model: ChangePasswordModel) {
    if (model.ConfirmPassword !== model.Password) {
      this.messageService.errorMessage('Password dont match', 'Passwords must match, tray again');
      return;
    }
    this.accountService.changePassword(model).subscribe(data => {
      if (data) {
        this.messageService.successMassage('Password changed', 'Password changed successfully, please login again.')

        setTimeout(() => {
          this.accountService.signOut();
        }, 2000);
      }
    });
  }

}
