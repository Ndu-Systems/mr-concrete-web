import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/_models';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['../user-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {
  user: UserModel;
  heading = 'My Profile';
  constructor() { }

  ngOnInit() {
  }

}
