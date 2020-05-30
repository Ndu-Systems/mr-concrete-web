import { Component, OnInit } from '@angular/core';
import { SETUP_ICONS } from '../constants';

@Component({
  selector: 'app-set-up-progress',
  templateUrl: './set-up-progress.component.html',
  styleUrls: ['./set-up-progress.component.scss']
})
export class SetUpProgressComponent implements OnInit {
  setupIcons = SETUP_ICONS;

  constructor() { }

  ngOnInit() { }

}
