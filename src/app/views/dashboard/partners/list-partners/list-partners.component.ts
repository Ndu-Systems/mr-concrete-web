import { Component, OnInit, Input } from '@angular/core';
import { UserModel, UserQueryModel } from 'src/app/_models';
import { UserService } from 'src/app/_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-partners',
  templateUrl: './list-partners.component.html',
  styleUrls: ['../partners.component.scss']
})
export class ListPartnersComponent implements OnInit {
  @Input() selectedList: UserModel[] = [];
  constructor(private userService: UserService, private routeTo: Router) { }

  ngOnInit() {

  }
  onUpdateClick(item: UserModel) {
    this.userService.updateUserViewState(item);
    this.routeTo.navigate(['/dashboard/update-partner']);
  }
}
