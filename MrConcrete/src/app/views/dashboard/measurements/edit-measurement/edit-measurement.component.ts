import { Component, OnInit } from '@angular/core';
import { UserModel, Measurement } from 'src/app/_models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountService, MeasurementService } from 'src/app/_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-measurement',
  templateUrl: './edit-measurement.component.html',
  styleUrls: ['./edit-measurement.component.scss']
})
export class EditMeasurementComponent implements OnInit {
  heading = 'Settings';
  subheading = 'Edit measurement';
  actionButton: any = {
    link: '/dashboard/measurements',
    label: 'View measurements'
  };
  rForm: FormGroup;
  currentUser: UserModel;
  measurement: Measurement;
  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private routeTo: Router,
    private measurementService: MeasurementService
  ) { }

  ngOnInit() {
    this.measurementService.measurement.subscribe(data => this.measurement = data);
    this.initForm();
  }
  initForm() {
    this.currentUser = this.accountService.CurrentUserValue;
    this.rForm = this.fb.group({
      MeasurementId: [this.measurement.MeasurementId],
      Name: [this.measurement.Name, Validators.required],
      UnitOfMeasurement: [this.measurement.UnitOfMeasurement, Validators.required],
      CreateUserId: [this.currentUser.UserId],
      ModifyUserId: [this.currentUser.UserId],
      StatusId: [this.measurement.StatusId]
    });
  }

  onSubmit(measurement: Measurement) {
    this.measurementService.updateMeasurement(measurement);
    this.routeTo.navigate(['/dashboard/measurements']);
  }
}
