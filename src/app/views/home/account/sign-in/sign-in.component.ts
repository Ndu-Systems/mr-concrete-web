import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SignInModel, TokenModel } from 'src/app/_models';
import { AccountService } from 'src/app/_services';
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
  token;
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
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    const baseUrlMain: string = (this.location as any)._platformLocation.location.href;
    // get token
    this.token = baseUrlMain.substring(baseUrlMain.indexOf('=' + 1));
    this.activateUser();
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
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || 'dashboard';
  }

  activateUser() {
    const tokenModel: TokenModel = { Token: this.token };
    if (this.token) {
      this.accountService.activateUser(this.token).subscribe(data => {
        if (data > 0) {
          alert('Account activated successfully');
        } else {
          alert('he is dead jimmy');
        }
      });
    }

  }

  onSubmit(model: SignInModel) {
    this.accountService.signIn(model)
      .pipe(first())
      .subscribe(data => {
        if (data.Email) {
          this.routeTo.navigate([this.returnUrl]);
        } else {
          this.error = 'This user does not exist!';
        }
      }, error => {
        this.error = 'ERROR: System error, please contact administrator';
      });
  }

}
