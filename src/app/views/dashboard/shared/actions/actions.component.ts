import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Actions } from '../constants/actions';
import { Router } from '@angular/router';
import { throwMatDialogContentAlreadyAttachedError } from '@angular/material';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {
  @Input() header: string;
  @Input() actions: Actions[] = [];
  @Output() selectedAction: EventEmitter<string> = new EventEmitter();

  constructor(
    private routeTo: Router
  ) { }

  ngOnInit() {
  }
  actionSelected(id) {
    this.selectedAction.emit(id);
  }
}
