import { Supplier } from './supplier.model';
import { Concreteorder } from './concreteorder.model';



export class SupplierOrdersModel {
  constructor() {
    this.Supplier = new Supplier();
    this.Orders = [];
  }
  Orders: Concreteorder[];
  Supplier: Supplier;
}
