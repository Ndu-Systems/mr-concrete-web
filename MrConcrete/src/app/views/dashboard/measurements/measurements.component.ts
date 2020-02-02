import { MeasurementService } from 'src/app/_services';
import { Component, OnInit } from '@angular/core';
import { ActionButton } from '../shared/constants/actions';
import { Measurement } from 'src/app/_models';

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
    private measurementService: MeasurementService
  ) { }

  ngOnInit() {
    this.measurements = this.measurementService.measurementsValue;
    this.measurementService.getMeasurements();
  }

}
