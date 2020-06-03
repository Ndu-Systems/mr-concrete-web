import { Component, OnInit, OnDestroy } from '@angular/core';

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
  constructor() { }

  ngOnInit() {}

  ngOnDestroy() {}

}
