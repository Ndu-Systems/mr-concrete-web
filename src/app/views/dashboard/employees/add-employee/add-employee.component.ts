import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Roles } from 'src/app/_shared';
import { EmailService, NotificationService, AccountService, UserService } from 'src/app/_services';
import { Router } from '@angular/router';
import { UserModel, SignUpModel, Email, EmailGetRequestModel } from 'src/app/_models';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['../employees.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  rForm: FormGroup;
  currentUser: UserModel;
  heading = 'Add Employee';
  subheading = 'Create a new system user for your organization';
  actionButton: any = {
    link: '/dashboard/employees',
    label: 'View Employees'
  };
  accessRoles: any[] = [
    {
      role: Roles.ASSISTANT
    },
    {
      role: Roles.DRIVER
    },
    {
      role: Roles.GENERAL
    }
  ];
  constructor(
    private accountService: AccountService,
    private userService: UserService,
    private fb: FormBuilder,
    private emailService: EmailService,
    private routeTo: Router,
    private messageService: NotificationService

  ) { }

  ngOnInit() {
    this.currentUser = this.accountService.CurrentUserValue;
    this.rForm = this.fb.group({
      Email: new FormControl(
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])
      ),
      Password: ['12345'],
      Cellphone: [null, Validators.required],
      FirstName: [null, Validators.required],
      LastName: [null, Validators.required],
      TypeOfUser: [null, Validators.required],
      CompanyId: [this.currentUser.CompanyId],
      CreateUserId: [this.currentUser.UserId, Validators.required],
      ModifyUserId: [this.currentUser.UserId, Validators.required],
      StatusId: [9]
    });
  }

  onSubmit(model: UserModel) {
    this.userService.addUser(model).subscribe(data => {
      if (data.UserId) {
        data.TypeOfUser = model.TypeOfUser;
        this.sendEmailActivation(data);
      }
    });
  }

  sendEmailActivation(data: UserModel) {
    const emailGetRequestModel: EmailGetRequestModel = {
      Email: data.Email
    };

    this.accountService.generateToken(emailGetRequestModel).subscribe(response => {
      const emailData: Email = {
        Email: data.Email,
        Subject: `Your user profile ${data.TypeOfUser} has been created`,
        Message: '',
        Link: this.accountService.generateForgotPasswordReturnLink(response.Token)
      };
      this.sendEmail(emailData);
    });
  }

  sendEmail(email: Email) {
    this.emailService.sendAccountActivationEmail(email).subscribe(data => {
      if (data > 0) {
        this.messageService.successMassage('Success', 'Staff created Successfully');
        this.goToEmployees();
      } else {
        this.messageService.errorMessage('Oops', 'Something went wrong please try again later');
        this.goToEmployees();

      }
    });
  }
  goToEmployees() {
    setTimeout(() => {
      this.routeTo.navigate(['/dashboard/employees']);
    }, 1700);
  }

}
