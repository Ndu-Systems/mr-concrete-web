import { Component, OnInit, Input } from '@angular/core';
import { CounterModel } from 'src/app/_models';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  @Input() counter: CounterModel;
  constructor() { }

  ngOnInit() {
  }

}
