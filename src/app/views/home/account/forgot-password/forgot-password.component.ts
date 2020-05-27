import { Email } from './../../../../_models/email.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AccountService } from 'src/app/_services';
import { Router, ActivatedRoute } from '@angular/router';
import { EmailService } from 'src/app/_services/communication/email.service';

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
    private routeTo: Router,
    private route: ActivatedRoute,
    private emailService: EmailService
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

  onSubmit(form) {
    // TEST email
    const email: Email = {
      Email: form.Email,
      Subject: 'Reset password',
      Message: '',
      Link: 'test'
    };

    this.emailService.sendResetPasswordEmail(email).subscribe(data => {
      if (data > 0) {
        alert('email sent successfully');
      } else {
        alert('He is dead Jimmy');
      }
    });
  }

}
