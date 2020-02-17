import { MeasurementService } from 'src/app/_services';
import { Component, OnInit } from '@angular/core';
import { ActionButton } from '../shared/constants/actions';
import { Measurement } from 'src/app/_models';
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
  measurements: Measurement[] = [];
  constructor(
    private measurementService: MeasurementService,
    private routeTo: Router
  ) { }

  ngOnInit() {
    this.measurementService.getMeasurements();
    this.measurementService.measurements.subscribe(data => this.measurements = data);
  }

  editMeasurement(measurement: Measurement) {
    this.measurementService.updateCurrentMeasurement(measurement);
    this.routeTo.navigate(['/dashboard/edit-measurement']);
  }

}
