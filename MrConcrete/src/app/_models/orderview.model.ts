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
    StatusId: string;
    measurements: Measurement[];
}
