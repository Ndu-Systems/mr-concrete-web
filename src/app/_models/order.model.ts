import { Orderproduct } from './orderproduct .model';

export interface Order {
    OrderId?: string;
    OrderNo?: number;
    CustomerId: string;
    SupplierId: string;
    ProjectNumber: string;
    DeliveryDate: string;
    DeliveryTime: string;
    DeliveryAddress: string;
    SpecialInstructions: string;
    Total: number;
    CreateDate?: string;
    CrateUserId: string;
    ModifyDate?: string;
    ModifyUserId: string;
    StatusId: number;
    ShowCart: boolean;
    Orderproducts: Orderproduct[];
}
