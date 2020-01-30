import { Component, OnInit } from '@angular/core';
import { CateroryService } from 'src/app/_services';
import { Observable } from 'rxjs';
import { Caterory } from 'src/app/_models';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {
  caterories$: Observable<Caterory[]>;
  constructor(private cateroryService: CateroryService) { }

  ngOnInit() {
    this.cateroryService.getCateries('test')
    this.caterories$ = this.cateroryService.categories;
  }

}
