import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService, EmailService, NotificationService } from 'src/app/_services';
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
  customerType =
    {
      description: 'Customer',
      role: Roles.CUSTOMER
    };

  supplierType = {
    description: 'Supplier',
    role: Roles.SUPPLIER
  };

  selectedType: string;
  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private emailService: EmailService,
    private routeTo: Router,
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
      Password: [null, Validators.required],
      Cellphone: [null, Validators.required],
      FirstName: [null, Validators.required],
      LastName: [null, Validators.required],
      TypeOfUser: [null],
      CreateUserId: ['sys'],
      ModifyUserId: ['sys'],
    });
  }
  onUserTypeClick(typeOfUser) {
    this.rForm.value.TypeOfUser = typeOfUser.role;
    this.selectedType = typeOfUser.role;
  }

  onSubmit(model: SignUpModel) {
    model.TypeOfUser = this.selectedType;
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
              this.messageService.successMassage('account registered successfully', 'Please check your email to activate account');
              this.goHome();
            } else {
              this.messageService.errorMessage('Oops', 'Something went wrong please try again later');
              this.goHome();
            }
          });
        }
      }, error => {
        this.error = error;
      });
  }

  goHome() {
    setTimeout(() => {
      this.routeTo.navigate(['/']);
    }, 1700);
  }

}
