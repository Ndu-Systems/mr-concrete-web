import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-heading',
  templateUrl: './home-heading.component.html',
  styleUrls: ['./home-heading.component.scss']
})
export class HomeHeadingComponent implements OnInit {
@Input() heading: string;
  constructor() { }

  ngOnInit() {
  }

}
