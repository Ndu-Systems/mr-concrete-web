import { Supplier } from './supplier.model';
import { OrderView } from './orderview.model';



export class SupplierOrdersModel {
  constructor() {
     this.Orders = [];
  }
  Orders: OrderView[];
  Supplier: Supplier;
}
