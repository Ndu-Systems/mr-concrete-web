export interface Orderproduct {
    OrderProductId: string;
    OrderId: string;
    ProductId: string;
    ProductName: string;
    Price: string;
    Quantity: string;
    Units: string;
    CreateDate?: string;
    CrateUserId: string;
    ModifyDate?: string;
    ModifyUserId: string;
    StatusId: number;
}