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
  accountTypes = [
    {
      description: 'I am a supplier',
      role: Roles.SUPPLIER
    },
    {
      description: 'I am a customer',
      role: Roles.CUSTOMER
    }
  ];
  TypeOfUser: any;
  selectedType: string;
  heading = 'Before We Continue.';
  paragraph = 'Give us, purpose for using this system.';

  showForm: boolean;
  userType: string;
  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');


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
          Validators.email
        ])
      ),
      Password: [null, Validators.required],
      Cellphone: [null],
      FirstName: [null, Validators.required],
      LastName: [null, Validators.required],
      CompanyName: [null],
      CompanyRepresentative: [null],
      TypeOfUser: [null],
      CreateUserId: ['sys'],
      ModifyUserId: ['sys'],
    });
  }
  onUserTypeClick() {
    const selectedType = this.TypeOfUser;
    this.showForm = true;
    if (selectedType === Roles.SUPPLIER) {
      this.isSupplier = true;
    } else {
      this.isSupplier = false;
    }
  }

  onChangeEvent(ev) {
    console.log(ev.target.value); // should print option1
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
