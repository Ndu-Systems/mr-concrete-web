import { Supplier } from './supplier.model';
import { Concreteorder } from './concreteorder.model';



export class SupplierOrdersModel {
  constructor() {
    this.Supplier = new Supplier();
  }
  Orders: Concreteorder[];
  Supplier: Supplier;
}
