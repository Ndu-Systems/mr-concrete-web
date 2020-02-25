import { Component, OnInit } from '@angular/core';
import { Actions } from '../shared/constants/actions';
import { PARTNERS_CONSTANTS, INDUSTRY_ACTION_CONSTANTS } from '../shared/constants/settings.constants';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  heading = 'Settings';
  subheading = 'System Settings';
  partnerActions: Actions[];
  industryActions: Actions[];
  partnerHeader = 'Partners';
  industryHeader = 'Industry Standards';
  constructor() { }

  ngOnInit() {
    this.partnerActions = PARTNERS_CONSTANTS;
    this.industryActions = INDUSTRY_ACTION_CONSTANTS;
  }

}
