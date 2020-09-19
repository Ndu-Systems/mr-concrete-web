import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PillModel } from 'src/app/_models';

@Component({
  selector: 'app-pills',
  templateUrl: './pills.component.html',
  styleUrls: ['./pills.component.scss']
})
export class PillsComponent implements OnInit {
  @Input() pillList: PillModel[];
  @Output() selectedPillEmitter: EventEmitter<PillModel> = new EventEmitter<PillModel>(null);
  constructor() { }

  ngOnInit() {
  }

  selected(model: PillModel) {
    this.selectedPillEmitter.emit(model);
  }

}
