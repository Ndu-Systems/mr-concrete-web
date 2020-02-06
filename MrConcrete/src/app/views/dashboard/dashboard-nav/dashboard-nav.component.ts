import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dashboard-nav',
  templateUrl: './dashboard-nav.component.html',
  styleUrls: ['./dashboard-nav.component.scss']
})
export class DashboardNavComponent implements OnInit {
  @Output() toggleNav: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

  toggleNave() {
    this.toggleNav.emit(true);
  }

}
