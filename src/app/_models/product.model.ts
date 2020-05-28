import { Property } from './property.model';

export interface Product {
    ProductId: string;
    UserId: string;
    ProductName: string;
    ShortDescription: string;
    Description: string;
    ProductCode: string;
    Price: number;
    Quantity: string;
    Units: string;
    CategoryId: string;
    CreateDate?: string;
    CreateUserId: string;
    ModifyDate?: string;
    ModifyUserId: string;
    StatusId: string;
    Properties: Property[];
}