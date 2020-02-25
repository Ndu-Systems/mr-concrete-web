import { Component, OnInit, OnDestroy } from '@angular/core';
import { CateroryService, SupplierService, MeasurementService, AccountService } from 'src/app/_services';
import { Observable } from 'rxjs';
import { Caterory, Supplier, Measurement, UserModel } from 'src/app/_models';
import { ConcreteorderService } from 'src/app/_services/dashboard/concreteorder.service';
import { OrderView, initOrderView } from 'src/app/_models/orderview.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {

  caterories$: Observable<Caterory[]>;
  suppliers$: Observable<Supplier[]>;
  suppliers: Supplier[];
  measurements$: Observable<Measurement[]>;
  measurements: Measurement[];
  order: OrderView = initOrderView;
  currentUser: UserModel;
  tabIndex = 3;

  heading = 'Orders';
  subheading = '    Create an order';
  actionButton: any = {
    link: '/dashboard/orders',
    label: 'View Orders'
  };
  constructor(
    private cateroryService: CateroryService,
    private supplierService: SupplierService,
    private measurementService: MeasurementService,
    private accountService: AccountService,
    private concreteorderService: ConcreteorderService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.currentUser = this.accountService.CurrentUserValue;
    this.cateroryService.getCateries();
    this.supplierService.getSuppliers(1);
    this.measurementService.getMeasurements();
    this.caterories$ = this.cateroryService.categories;
    this.suppliers$ = this.supplierService.suppliers;
    this.measurements$ = this.measurementService.measurements;
    this.measurementService.measurements.subscribe(measurements => {
      this.order.CreateUserId = this.currentUser.UserId;
      this.order.ModifyUserId = this.currentUser.UserId;
      this.measurements = measurements;
      this.order.measurements = this.mapMeasurements(measurements);
    });
    this.supplierService.suppliers.subscribe(data => {
      this.suppliers = data;
    });
  }

  mapMeasurements(measurements: Measurement[]): Measurement[] {
    this.order.measurements = measurements;
    this.order.measurements.forEach(data => {
      data.Value = '';
    });
    return this.order.measurements;
  }
  getMeasurementLabels(measurements: Measurement[]) {
    measurements.forEach(data => {
      const check = this.measurements.find(x => x.MeasurementId === data.MeasurementId);
      data.Name = check && check.Name || '';
    });
    return measurements;
  }
  getNewMeasurementLabels() {
    let all = this.measurements;
    all.forEach(data => {
      const check = this.measurements.find(x => x.MeasurementId === data.MeasurementId);
      data.Name = check && check.Name || '';
    });
    return all;
  }

  selectCatergory(caterory: Caterory) {
    this.order.CategoryId = caterory.CategoryId;
    this.order.category = caterory;
    console.log(this.order);
  }
  selectSupplier(supplier: Supplier) {
    this.supplierService.resetCardClass(this.suppliers);
    supplier.Selected = 'yes';
    this.order.SupplierId = supplier.SupplierId;
    this.order.supplier = supplier;
    this.supplierService.apendState(supplier);
  }
  preview() {
    this.order.isBusyWith = false;
    this.concreteorderService.setStateForCurrentOrder(this.order);
    this.router.navigate(['dashboard/view-order']);
  }
  clear() {
    this.concreteorderService.setStateForCurrentOrder(null);
  }
  nextTab(i: number) {
    this.tabIndex = i;
  }
}
