import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserQueryModel, UserModel, Placeholder, NavigationModel, ConfirmModel } from 'src/app/_models';
import { UserService, NotificationService, ApiService } from 'src/app/_services';
import { USER_TYPES } from '../shared';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit, OnDestroy {
  heading = 'Employees';
  subheading = 'List of employees on the system';
  showConfirmDeleteModal: boolean;
  actionButton: any = {
    link: '/dashboard/add-employee',
    label: '+ employee'
  };

  placeHolder: Placeholder = {
    imageUrl: 'assets/images/dashboard/placeholders/staff.svg',
    message: 'No employees found.',
    link: '/dashboard/add-employee',
    linkLabel: 'Add employee'
  };

  confirmModel: ConfirmModel = {
    Heading: 'Are you sure?',
    Description: 'This record will not be visible on the system.',
    ButtonLabel: 'Yes, delete',
    Image: 'assets/images/dashboard/action-card/delete.svg'
  };

  private onDestroy$ = new Subject<boolean>();

  employees: UserModel[] = [];
  queryUserModel: UserQueryModel;
  userTypes = USER_TYPES;
  dummyDate = Date.now();
  itemToDelete: UserModel;
  constructor(
    private userService: UserService,
    private apiService: ApiService,
    private routTo: Router,
    private messageService: NotificationService
  ) { }

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employees = [];
    this.queryUserModel = {
      StatusId: '1',
      TypeOfUser: 'All'
    };
    this.userService.getAllUsers(this.queryUserModel)
      .pipe(
        takeUntil(this.onDestroy$)
      )
      .subscribe(data => {
        if (data.length > 0) {
          const employeeList = data;
          employeeList.forEach(item => {
            this.switchStaff(item);
          });
        }
      });

    this.userService.clearCurrentUser();
  }
  switchStaff(item: UserModel) {
    switch (item.RoleId) {
      case '4':
      case '6':
        this.employees.push(item);
        break;
      default:
        break;
    }
  }
  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  onUpdateClick(item: UserModel) {
    this.userService.updateUserViewState(item);
    const nav: NavigationModel = {
      heading: 'View employee',
      subheading: 'See employee details here',
      returnUrl: '/dashboard/employees'
    };
    this.apiService.updateNavState(nav);
    this.routTo.navigate(['/dashboard/view-employee']);
  }
  // own confirm modal no plugin used
  deleteItem(item) {
    this.itemToDelete = item;
    this.showConfirmDeleteModal = !this.showConfirmDeleteModal;
  }
  performDelete() {
    this.itemToDelete.StatusId = '2'; // inactive status
    this.userService.updateUser(this.itemToDelete).subscribe(data => {
      this.messageService.dangerMessage('Record deleted', 'Record has been deleted');
      this.loadEmployees();
      this.showConfirmDeleteModal = !this.showConfirmDeleteModal;
    });
  }
}
