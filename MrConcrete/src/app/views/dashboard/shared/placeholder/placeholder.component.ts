import { Component, OnInit, Input } from '@angular/core';
import { Placeholder } from 'src/app/_models';

@Component({
  selector: 'app-placeholder',
  templateUrl: './placeholder.component.html',
  styleUrls: ['./placeholder.component.scss']
})
export class PlaceholderComponent implements OnInit {
  @Input() placeHolder: Placeholder;
  constructor() { }

  ngOnInit() {
    console.log(this.placeHolder);
  }

}
