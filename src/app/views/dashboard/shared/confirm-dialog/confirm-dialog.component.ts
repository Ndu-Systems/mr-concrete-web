import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ConfirmModel } from 'src/app/_models';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  @Input() showConfirmDeleteModal: boolean;
  @Input() confirm: ConfirmModel;

  @Output() ConfirmAction: EventEmitter<boolean> = new EventEmitter();
  @Output() CancelAction: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  continue() {
    this.ConfirmAction.emit(true);
  }
  cancelAction() {
    this.CancelAction.emit(false);
  }

}
