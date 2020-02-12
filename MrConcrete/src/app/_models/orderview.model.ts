import { Caterory, initCaterory } from './caterory.model';

export interface Measurement {
    Id: string;
    OrderId: string;
    MeasurementId: string;
    Value: string;
    CreateDate: string;
    CreateUserId: string;
    ModifyDate: string;
    ModifyUserId: string;
    StatusId: string;
}


export interface Supplier {
    SupplierId: string;
    SupplierName: string;
    ContactNumber: string;
    EmailAddress: string;
    ContactPerson: string;
    SupplierAddress: string;
    City: string;
    PostalCode: string;
    CreateDate: string;
    CreateUserId: string;
    ModifyDate: string;
    ModifyUserId: string;
    StatusId: string;
}

export interface OrderView {
    OrderId: string;
    UserId: string;
    ProjectCode: string;
    OrderNumber: string;
    SupplierId: string;
    OrderDate: string;
    DeliveryDate: string;
    TruckArrivalTime: string;
    Directions: string;
    SpecialInstructions: string;
    CategoryId: string;
    CreateDate: string;
    CreateUserId: string;
    ModifyDate: string;
    ModifyUserId: string;
    StatusId: number;
    measurements: Measurement[];
    category: Caterory;
    supplier: Supplier;
}
export const initSupplier: Supplier = {
    SupplierId: '',
    SupplierName: '',
    ContactNumber: '',
    EmailAddress: '',
    ContactPerson: '',
    SupplierAddress: '',
    City: '',
    PostalCode: '',
    CreateDate: '',
    CreateUserId: '',
    ModifyDate: '',
    ModifyUserId: '',
    StatusId: '',
}

export const initOrderView: OrderView = {
    OrderId: '',
    UserId: '',
    ProjectCode: '',
    OrderNumber: '',
    SupplierId: '',
    OrderDate: '',
    DeliveryDate: '',
    TruckArrivalTime: '',
    Directions: '',
    SpecialInstructions: '',
    CategoryId: '',
    CreateDate: '',
    CreateUserId: '',
    ModifyDate: '',
    ModifyUserId: '',
    StatusId: 1,
    measurements:  [],
    category:  initCaterory,
    supplier:  initSupplier,
}


