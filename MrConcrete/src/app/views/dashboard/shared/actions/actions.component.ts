import { Component, OnInit, Input } from '@angular/core';
import { Actions } from '../constants/actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {
  @Input() header: string;
  @Input() actions: Actions[] = [];


  constructor(
    private routeTo: Router
  ) { }

  ngOnInit() {
    console.log(this.actions);
  }

}
