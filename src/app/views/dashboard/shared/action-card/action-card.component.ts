import { Component, OnInit, Input } from '@angular/core';
import { CompanyModel } from 'src/app/_models';

@Component({
  selector: 'app-action-card',
  templateUrl: './action-card.component.html',
  styleUrls: ['./action-card.component.scss']
})
export class ActionCardComponent implements OnInit {
  @Input() class: string;
  @Input() companyModel: CompanyModel;
  constructor() { }

  ngOnInit() {
    console.log(this.companyModel);
  }

}
