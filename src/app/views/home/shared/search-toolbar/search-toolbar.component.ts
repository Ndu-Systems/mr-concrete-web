import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-toolbar',
  templateUrl: './search-toolbar.component.html',
  styleUrls: ['./search-toolbar.component.scss']
})
export class SearchToolbarComponent implements OnInit {
  SearchText;
  constructor() { }

  ngOnInit() {
  }

}
