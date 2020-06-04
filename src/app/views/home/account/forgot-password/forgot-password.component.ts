import { Email, EmailGetRequestModel } from './../../../../_models/email.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AccountService, NotificationService } from 'src/app/_services';
import { Router, ActivatedRoute } from '@angular/router';
import { EmailService } from 'src/app/_services/communication/email.service';
import { UserService } from 'src/app/_services/dashboard';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  rForm: FormGroup;
  error;
  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private userService: UserService,
    private routeTo: Router,
    private route: ActivatedRoute,
    private emailService: EmailService,
    private messageService: NotificationService

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

    });
  }

  onSubmit(form: EmailGetRequestModel) {
    this.userService.getUserByEmail(form).subscribe
      (data => {
        if (data) {
          const emailGetRequestModel: EmailGetRequestModel = {
            Email: data.Email
          };
          this.accountService.generateToken(emailGetRequestModel).subscribe(
            userWithToken => {

              const email: Email = {
                Email: form.Email,
                Subject: 'Reset password',
                Message: '',
                Link: this.accountService.generateForgotPasswordReturnLink(userWithToken.Token)
              };

              this.emailService.sendResetPasswordEmail(email).subscribe(response => {
                if (response > 0) {
                  this.messageService.successMassage('Success', 'Please check your email to reset password');
                  this.goHome();

                } else {
                  this.messageService.errorMessage('Oops', 'Something went wrong please try again later');
                  this.goHome();

                }
              });

            });
        }
      });

  }
  goHome() {
    setTimeout(() => {
      this.routeTo.navigate(['/']);
    }, 1700);
  }

}
