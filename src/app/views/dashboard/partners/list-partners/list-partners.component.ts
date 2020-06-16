import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserModel, UserQueryModel, Placeholder, NavigationModel } from 'src/app/_models';
import { UserService, ApiService, NotificationService } from 'src/app/_services';
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
  @Output() deletionCompleted: EventEmitter<UserModel> = new EventEmitter();

  itemToDelete: UserModel;
  placeHolder: Placeholder = {
    imageUrl: 'assets/images/dashboard/placeholders/partner.svg',
    message: 'No partners found in our system.',
    link: '/dashboard/add-partner',
    linkLabel: 'Create new partner'
  };

  showConfirmDeleteModal: boolean;

  constructor(
    private userService: UserService,
    private routeTo: Router,
    private messageService: NotificationService,

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

  deleteItem(item) {
    this.itemToDelete = item;
    this.showConfirmDeleteModal = !this.showConfirmDeleteModal;
  }

  performDelete() {
    this.itemToDelete.StatusId = '2';
    this.userService.updateUser(this.itemToDelete).subscribe(data => {
      this.messageService.dangerMessage('Record deleted', 'Record has been deleted');
      this.deletionCompleted.emit(data);
      this.showConfirmDeleteModal = !this.showConfirmDeleteModal;
    });
  }
}
