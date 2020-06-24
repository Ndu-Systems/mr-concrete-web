import { Order } from './order.model';
import { AddressModel } from './address.model';

export interface DeliveryModel {
  Id: string;
  OrderId: string;
  UserId: string;
  DriverId: string;
  DeliveryStartDateTime: string;
  DeliveryEndDateTime: string;
  IsDeleted: string;
  StatusId: string;
  OrderNo: string;
  CustomerId: string;
  SupplierId: string;
  ProjectNumber: string;
  DeliveryDate: string;
  DeliveryTime: string;
  DeliveryAddress: string;
  SpecialInstructions: string;
  Total: string;
  CreateDate: string;
  CrateUserId: string;
  ModifyDate: string;
  ModifyUserId: string;
  Order: OrderDelivery;
}

export interface OrderDelivery extends Order {
  Customer?: Customer;
  Address: AddressModel;
  Supplier: OrderSupplier;
}
export interface OrderSupplier {
  CompanyId: string;
  CompanyName: string;
  CompanyPhone: string;
  CompanyEmail: string;
  ParentId?: any;
  CompanyType: string;
  CompanyAddress: string;
  City: string;
  Province: string;
  PostalCode: string;
  CreateDate: string;
  CreateUserId: string;
  ModifyDate: string;
  ModifyUserId: string;
  IsDeleted: string;
  StatusId: string;
}

export interface Customer {
  UserId: string;
  FirstName: string;
  LastName: string;
  Email: string;
  Password: string;
  Cellphone: string;
  RoleId: string;
  CompanyId?: any;
  Token: string;
  CreateDate: string;
  CreateUserId: string;
  ModifyDate: string;
  ModifyUserId: string;
  StatusId: string;
}
