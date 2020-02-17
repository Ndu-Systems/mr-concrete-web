import { Component, OnInit } from '@angular/core';
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
      // this.order.measurements = this.mapMeasurements(measurements);
    });
    this.supplierService.suppliers.subscribe(data => {
      this.suppliers = data;
    });
    this.initOrder();
  }
  initOrder() {
    this.concreteorderService.order.subscribe(data => {
      const order = data;
      if (order.isBusyWith) {
        this.order = order;
        this.order.measurements = this.getMeasurementLabels(this.order.measurements);
        this.selectSupplier(this.order.supplier);
        // this.order.measurements = this.mapMeasurements(this.order.measurements);

      }
    });
  }
  // mapMeasurements(measurements: Measurement[]): Measurement[] {
  //   const concreteordermeasurements: Measurement[] = [];
  //   measurements.forEach(data => {
  //     const concreteordermeasurement: Measurement[];
  //     concreteordermeasurement.MeasurementId = data.MeasurementId;
  //     concreteordermeasurement.Name = data.Name;
  //     concreteordermeasurement.Value = data.Value;
  //     concreteordermeasurement.CreateUserId = this.currentUser.UserId;
  //     concreteordermeasurement.ModifyUserId = this.currentUser.UserId;
  //     concreteordermeasurements.push(concreteordermeasurement);
  //   });
  //   return concreteordermeasurements;
  // }
  getMeasurementLabels(measurements: Measurement[]) {
    measurements.forEach(data => {
      const check = this.measurements.find(x => x.MeasurementId === data.MeasurementId);
      data.Name = check && check.Name || '';
    });
    return measurements;
  }
  selectCatergory(caterory: Caterory) {
    this.order.CategoryId = caterory.CategoryId;
    this.order.category = caterory;
    console.log(this.order);
  }
  selectSupplier(supplier: Supplier) {
    this.supplierService.resetCardClass(this.suppliers,supplier);
    supplier.Selected = 'yes';
    this.order.SupplierId = supplier.SupplierId;
    this.order.supplier = supplier;
  }
  preview() {
    this.order.isBusyWith = false;
    this.concreteorderService.setStateForCurrentOrder(this.order);
    this.router.navigate(['dashboard/view-order']);
  }
}
