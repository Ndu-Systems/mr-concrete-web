import { Message, ConfirmationService } from 'primeng/api';
import { MeasurementService, AccountService } from 'src/app/_services';
import { Component, OnInit } from '@angular/core';
import { ActionButton } from '../shared/constants/actions';
import { Measurement, UserModel } from 'src/app/_models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-measurements',
  templateUrl: './measurements.component.html',
  styleUrls: ['./measurements.component.scss']
})
export class MeasurementsComponent implements OnInit {
  heading = 'Settings';
  subheading = 'Measurements';
  actionButton: ActionButton = {
    link: '/dashboard/add-measurement',
    label: 'add measurement'
  };
  msgs: Message[] = [];
  currentUser: UserModel;
  measurements: Measurement[] = [];
  constructor(
    private measurementService: MeasurementService,
    private confirmationService: ConfirmationService,
    private accountService: AccountService,
    private routeTo: Router
  ) { }

  ngOnInit() {
    this.measurementService.getMeasurements();
    this.measurementService.measurements.subscribe(data => this.measurements = data);
    this.currentUser = this.accountService.CurrentUserValue;
  }

  editMeasurement(measurement: Measurement) {
    this.measurementService.updateCurrentMeasurement(measurement);
    this.routeTo.navigate(['/dashboard/edit-measurement']);
  }
  archiveMeasurement(measurement: Measurement) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation Action',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        measurement.StatusId = '2';
        measurement.ModifyUserId = this.currentUser.UserId;
        this.measurementService.updateMeasurement(measurement);
        this.msgs = [{ severity: 'warn', summary: 'Archived', detail: 'Measurement successfully archived.' }];
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'Have rejected the archive action' }];
      }
    });
  }
}
