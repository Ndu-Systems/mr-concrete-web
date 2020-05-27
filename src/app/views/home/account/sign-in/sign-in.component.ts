import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SignInModel, TokenModel } from 'src/app/_models';
import { AccountService, NotificationService } from 'src/app/_services';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Roles } from 'src/app/_shared';
import { MessageService } from 'primeng/api';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  rForm: FormGroup;
  hidePassword = true;
  error: string;
  returnUrl: string;
  email = environment.EMAIL;
  password = environment.PASSWORD;
  verificationEmail;
  token: string;
  accessRoles: any[] = [
    {
      description: 'I am an engineer',
      role: Roles.ENGINEER
    },
    {
      description: 'I am a supplier',
      role: Roles.SUPPLIER
    }
  ];
  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private routeTo: Router,
    private route: ActivatedRoute,
    private location: LocationStrategy,
    private messageService: NotificationService
  ) { }

  ngOnInit() {
    this.rForm = this.fb.group({
      Email: new FormControl(
        this.email,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])
      ),
      Password: [this.password, Validators.required],
      TypeOfUser: [null]
    });
    const baseUrlMain: string = (this.location as any)._platformLocation.location.href;
    this.token = baseUrlMain.substring(baseUrlMain.indexOf('=') + 1);

    this.activateUser();
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || 'dashboard';
  }

  activateUser() {
    const tokenModel: TokenModel = { Token: this.token };
    console.log(tokenModel);
    if (tokenModel.Token) {
      this.accountService.activateUser(tokenModel).subscribe(data => {
        if (data > 0) {
          this.messageService.successMassage('account activated successfully', 'please login');
        }
      });
    }
  }

  onSubmit(model: SignInModel) {
    this.accountService.signIn(model)
      .pipe(first())
      .subscribe(data => {
        if (data.Email) {
          setTimeout(() => {
            this.routeTo.navigate([this.returnUrl]);
          }, 1500);
        }
      }, error => {
        this.error = 'ERROR: System error, please contact administrator';
      });
  }

}
