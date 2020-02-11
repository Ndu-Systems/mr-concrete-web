import { Component, OnInit } from '@angular/core';
import { CateroryService, SupplierService, MeasurementService, AccountService } from 'src/app/_services';
import { Observable } from 'rxjs';
import { Caterory, Supplier, Measurement, Concreteordermeasurements, UserModel } from 'src/app/_models';
import { Order } from 'src/app/_models/order.model';
import { ConcreteorderService } from 'src/app/_services/dashboard/concreteorder.service';

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
  order: Order = new Order();
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
  ) { }

  ngOnInit() {
    this.currentUser = this.accountService.CurrentUserValue;
    this.cateroryService.getCateries();
    this.supplierService.getSuppliers();
    this.measurementService.getMeasurements();
    this.caterories$ = this.cateroryService.categories;
    this.suppliers$ = this.supplierService.suppliers;
    this.measurements$ = this.measurementService.measurements;
    this.measurementService.measurements.subscribe(measurements => {
      this.order = new Order();
      this.order.concreteorder.CreateUserId = this.currentUser.UserId;
      this.order.concreteorder.ModifyUserId = this.currentUser.UserId;
      this.order.concreteordermeasurements = this.mapMeasurements(measurements);
    });
    this.supplierService.suppliers.subscribe(data => {
      this.suppliers = data;
    });
  }
  mapMeasurements(measurements: Measurement[]): Concreteordermeasurements[] {
    const concreteordermeasurements: Concreteordermeasurements[] = [];
    measurements.forEach(data => {
      const concreteordermeasurement = new Concreteordermeasurements();
      concreteordermeasurement.MeasurementId = data.MeasurementId;
      concreteordermeasurement.Name = data.Name;
      concreteordermeasurement.CreateUserId = this.currentUser.UserId;
      concreteordermeasurement.ModifyUserId = this.currentUser.UserId;
      concreteordermeasurements.push(concreteordermeasurement);
    });
    return concreteordermeasurements;
  }
  selectCatergory(caterory: Caterory) {
    if (!this.order) {
      this.order = new Order();
    }
    this.order.concreteorder.CategoryId = caterory.CategoryId;
    console.log(this.order);
  }
  selectSupplier(supplier: Supplier) {
    if (!this.order) {
      this.order = new Order();
      this.supplierService.apendState(supplier);
    }
    this.supplierService.resetCardClass(this.suppliers);
    supplier.Selected = 'yes';
    this.order.concreteorder.SupplierId = supplier.SupplierId;
    // console.log(this.order);
  }
  save() {
    this.concreteorderService.createOrder(this.order).subscribe(response => {
      console.log('order saved', response);

    });
  }
}
