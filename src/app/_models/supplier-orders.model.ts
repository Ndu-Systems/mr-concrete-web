import { Supplier } from './supplier.model';
import { OrderView } from './orderview.model';



export class SupplierOrdersModel {
  constructor() {
    this.Supplier = new Supplier();
    this.Orders = [];
  }
  Orders: OrderView[];
  Supplier: Supplier;
}
