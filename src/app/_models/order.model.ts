import { Orderproduct } from './orderproduct .model';

export interface Order {
    OrderId: string;
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
    StatusId: string;
    Orderproducts: Orderproduct[];
}