import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserModel, Measurement } from 'src/app/_models';
import { AccountService, MeasurementService } from 'src/app/_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-measurement',
  templateUrl: './create-measurement.component.html',
  styleUrls: ['./create-measurement.component.scss']
})
export class CreateMeasurementComponent implements OnInit {
  heading = 'Settings';
  subheading = 'Create a new measurement';
  rForm: FormGroup;
  currentUser: UserModel;
  actionButton: any = {
    link: '/dashboard/measurements',
    label: 'View measurements'
  };
  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private messageService: MessageService,
    private routeTo: Router,
    private measurementService: MeasurementService
  ) { }

  ngOnInit() {
    this.currentUser = this.accountService.CurrentUserValue;
    this.rForm = this.fb.group({
      Name: [null, Validators.required],
      UnitOfMeasurement: [null, Validators.required],
      CreateUserId: [this.currentUser.UserId],
      ModifyUserId: [this.currentUser.UserId],
      StatusId: [1]
    });
  }

  onSubmit(measureMent: Measurement) {
    this.measurementService.addMeasurement(measureMent);
    this.messageService.add({
      severity: 'success',
      summary: `Success!`,
      detail: 'Measurement added successfully',
      life: 1000
    });
    this.measurementService.getMeasurements();
    this.routeTo.navigate(['/dashboard/measurements']);
   }
}
