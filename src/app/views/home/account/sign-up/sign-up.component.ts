import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService, EmailService } from 'src/app/_services';
import { Roles } from 'src/app/_shared';
import { SignUpModel, Email } from 'src/app/_models';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  rForm: FormGroup;
  hidePassword = true;
  error: string;
  isSupplier: boolean;
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
    private emailService: EmailService,
    private routeTo: Router
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
      Cellphone: [null, Validators.required],
      FirstName: [null, Validators.required],
      LastName: [null, Validators.required],
      CreateUserId: ['sys'],
      ModifyUserId: ['sys'],
    });
  }
  onUserTypeClick(typeOfUser) {
    if (typeOfUser === Roles.SUPPLIER) {
      this.isSupplier = !this.isSupplier;
    } else { this.isSupplier = false; }
  }

  onSubmit(model: SignUpModel) {

    this.accountService.signUp(model)
      .pipe(first())
      .subscribe(data => {
        if (data.Email) {
          const email: Email = {
            Email: data.Email,
            Subject: 'Welcome & Activation',
            Message: '',
            Link: this.accountService.generateAccountActivationReturnLink(data.Email, data.Token)
          };

          this.emailService.sendAccountActivationEmail(email).subscribe(response => {
            if (response > 0) {
              alert('email sent successfully');
            } else {
              alert('He is dead Jimmy');
            }
          });
        }
      }, error => {
        this.error = error;
      });
  }

}
