import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SYSTEM_ROLES } from 'src/app/_shared';
import { AccountService, UserService, EmailService, NotificationService } from 'src/app/_services';
import { Router } from '@angular/router';
import { UserModel, EmailGetRequestModel, Email } from 'src/app/_models';

@Component({
  selector: 'app-create-partner',
  templateUrl: './create-partner.component.html',
  styleUrls: ['../partners.component.scss']
})
export class CreatePartnerComponent implements OnInit {
  userRoles = SYSTEM_ROLES;
  rForm: FormGroup;
  currentUser: UserModel;
  heading = 'Add Partner';
  subheading = 'Create a new partner user of any type.';
  actionButton: any = {
    link: '/dashboard/partners',
    label: 'View Partners'
  };
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
  onSubmit(partner: UserModel) {
    this.userService.addUser(partner).subscribe(data => {
      if (data.UserId) {
        data.TypeOfUser = partner.TypeOfUser;
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
        Subject: `Your user profile of type: ${data.TypeOfUser}, has been created`,
        Message: '',
        Link: this.accountService.generateForgotPasswordReturnLink(response.Token)
      };
      this.sendEmail(emailData);
    });

  }
  sendEmail(email: Email) {
    this.emailService.sendAccountActivationEmail(email).subscribe(data => {
      if (data > 0) {
        this.messageService.successMassage('Success', 'Partner created Successfully');
        this.goToPartners();
      } else {
        this.messageService.errorMessage('Oops', 'Something went wrong please try again later');
        this.goToPartners();
      }
    });
  }

  goToPartners() {
    setTimeout(() => {
      this.routeTo.navigate(['/dashboard/partners']);
    }, 1700);
  }

}
