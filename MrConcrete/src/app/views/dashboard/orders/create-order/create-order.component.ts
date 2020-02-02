import { Component, OnInit } from '@angular/core';
import { CateroryService, SupplierService, MeasurementService } from 'src/app/_services';
import { Observable } from 'rxjs';
import { Caterory, Supplier, Measurement } from 'src/app/_models';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {
  caterories$: Observable<Caterory[]>;
  suppliers$: Observable<Supplier[]>;
  measurements$: Observable<Measurement[]>;
  constructor(
    private cateroryService: CateroryService,
    private supplierService: SupplierService,
    private measurementService: MeasurementService,
  ) { }

  ngOnInit() {
    this.cateroryService.getCateries();
    this.supplierService.getSuppliers();
    this.caterories$ = this.cateroryService.categories;
    this.suppliers$ = this.supplierService.suppliers;
    this.measurements$ = this.measurementService.measurements;
  }

}
