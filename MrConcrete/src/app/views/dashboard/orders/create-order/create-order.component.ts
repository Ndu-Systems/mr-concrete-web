import { Component, OnInit } from '@angular/core';
import { CateroryService, SupplierService } from 'src/app/_services';
import { Observable } from 'rxjs';
import { Caterory,Supplier } from 'src/app/_models';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {
  caterories$: Observable<Caterory[]>;
  suppliers$: Observable<Supplier[]>;
  constructor(
    private cateroryService: CateroryService,
    private supplierService: SupplierService,
  ) { }

  ngOnInit() {
    this.cateroryService.getCateries('test');
    this.supplierService.getSuppliers('test');
    this.caterories$ = this.cateroryService.categories;
    this.suppliers$ = this.supplierService.suppliers;
  }

}
