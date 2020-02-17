import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-measurement',
  templateUrl: './edit-measurement.component.html',
  styleUrls: ['./edit-measurement.component.scss']
})
export class EditMeasurementComponent implements OnInit {
  heading = 'Settings';
  subheading = 'Edit measurement';

  constructor() { }

  ngOnInit() {
  }

}
