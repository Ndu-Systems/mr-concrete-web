import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserQueryModel, UserModel } from 'src/app/_models';
import { UserService, NotificationService } from 'src/app/_services';
import { USER_TYPES } from '../shared';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit, OnDestroy {
  heading = 'Employees';
  subheading = 'List of employees on the system';
  actionButton: any = {
    link: '/dashboard/employees',
    label: 'Add employee'
  };
  employees: UserModel[] = [];
  queryUserModel: UserQueryModel;
  userTypes = USER_TYPES;
  dummyDate = Date.now();
  constructor(
    private userService: UserService,
    private messageService: NotificationService
  ) { }

  ngOnInit() {
    this.queryUserModel = {
      StatusId: '1',
      TypeOfUser: 'All'
    }

    this.userService.getAllUsers(this.queryUserModel).subscribe(data => {
      if (data.length > 0) {
        const employeeList = data;
        employeeList.forEach(item => {
          if (item.RoleId === '4'
            || item.RoleId === '6') {
            this.employees.push(item);
          }
        });
      }
    });
  }

  ngOnDestroy() { }

}
