import { Component, OnInit, Input } from '@angular/core';
import { UserModel } from 'src/app/_models';
import { AccountService } from 'src/app/_services';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  @Input() heading: string;
  @Input() subheading: string;
  currentUser: UserModel;
  today: number = Date.now();
  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit() {
    this.currentUser = this.accountService.CurrentUserValue;
  }

}
