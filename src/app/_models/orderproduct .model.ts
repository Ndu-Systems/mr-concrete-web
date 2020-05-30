import { Image } from './image.model';

export interface Orderproduct {
    OrderProductId: string;
    OrderId: string;
    ProductId: string;
    ProductName: string;
    Price: number;
    Quantity: number;
    Units: string;
    CreateDate?: string;
    CrateUserId: string;
    ModifyDate?: string;
    ModifyUserId: string;
    StatusId: number;
    Images?: Image[];
}