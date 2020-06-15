import { Component, OnInit, Input } from '@angular/core';
import { UserModel, UserQueryModel, Placeholder, NavigationModel } from 'src/app/_models';
import { UserService, ApiService } from 'src/app/_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-partners',
  templateUrl: './list-partners.component.html',
  styleUrls: ['../partners.component.scss']
})
export class ListPartnersComponent implements OnInit {
  @Input() selectedList: UserModel[] = [];
  @Input() isSelected: boolean;
  nav: NavigationModel;
  placeHolder: Placeholder = {
    imageUrl: 'assets/images/dashboard/placeholders/partner.svg',
    message: 'No partners found in our system.',
    link: '/dashboard/add-partner',
    linkLabel: 'Create new partner'
  };

  constructor(
    private userService: UserService,
    private routeTo: Router,
    private navigateService: ApiService) { }

  ngOnInit() {
    this.userService.clearCurrentUser();
  }
  onUpdateClick(item: UserModel) {

    const navigation: NavigationModel = {
      heading: item.Roles.RoleName,
      subheading: `View ${item.Roles.RoleName}s`,

    };

    this.navigateService.updateNavState(navigation);
    this.userService.updateUserViewState(item);
    this.routeTo.navigate(['/dashboard/view-partner']);
  }
}
