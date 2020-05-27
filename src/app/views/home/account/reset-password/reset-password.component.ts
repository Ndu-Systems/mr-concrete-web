import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TokenModel } from 'src/app/_models';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AccountService } from 'src/app/_services';
import { LocationStrategy } from '@angular/common';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  token: TokenModel;
  rForm: FormGroup;

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
    this.token.Token = baseUrlMain.substring(baseUrlMain.indexOf('=' + 1));
  }

  getUserByToken() {
    if (!this.token) {
      this.invalidRequestRedirect('You should not be here');
    }

  }
  invalidRequestRedirect(message: string) {
    this.messageService.add({
      severity: 'warn',
      summary: 'Oops',
      detail: message,
      life: 7000
    });
    setTimeout(() => {
      this.routeTo.navigate(['forgot-password']);
    }, 2000);
  }
}
