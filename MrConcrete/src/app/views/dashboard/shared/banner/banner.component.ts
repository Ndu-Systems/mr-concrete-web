import { Component, OnInit, Input } from '@angular/core';
import { UserModel } from 'src/app/_models';
import { AccountService } from 'src/app/_services';
import { ActionButton } from '../constants/actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  @Input() heading: string;
  @Input() subheading: string;
  @Input() actionButton: ActionButton;
  currentUser: UserModel;
  today: number = Date.now();
  constructor(
    private accountService: AccountService,
    private routeTo: Router
  ) { }

  ngOnInit() {
    this.currentUser = this.accountService.CurrentUserValue;
  }

  navigateTo(link: string){
    this.routeTo.navigate([link]);
  }

}
