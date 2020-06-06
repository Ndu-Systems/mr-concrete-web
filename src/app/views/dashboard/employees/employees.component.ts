import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserQueryModel, UserModel, Placeholder } from 'src/app/_models';
import { UserService, NotificationService } from 'src/app/_services';
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
  actionButton: any = {
    link: '/dashboard/add-employee',
    label: 'Add employee'
  };

  placeHolder: Placeholder = {
    imageUrl: 'assets/images/dashboard/placeholders/staff.svg',
    message: 'No employees found.',
    link: '/dashboard/add-employee',
    linkLabel: 'Add employee'
  };

  private onDestroy$ = new Subject<boolean>();

  employees: UserModel[] = [];
  queryUserModel: UserQueryModel;
  userTypes = USER_TYPES;
  dummyDate = Date.now();
  constructor(
    private userService: UserService,
    private messageService: NotificationService,
    private routTo: Router
  ) { }

  ngOnInit() {
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
    this.routTo.navigate(['/dashboard/edit-employee']);
  }
}
