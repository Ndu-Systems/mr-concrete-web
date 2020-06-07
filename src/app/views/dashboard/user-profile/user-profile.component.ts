import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/_services';
import { UserModel } from 'src/app/_models';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: UserModel;
  heading = 'My Profile';
  subheading = 'This is your system profile information';
  rating = 3;
  showModal: boolean;
  actionButton: any = {
    link: '/dashboard/update-profile',
    label: 'Update profile'
  };

  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit() {
    this.user = this.accountService.CurrentUserValue;
  }

}
