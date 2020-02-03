export class Concreteordermeasurements {
    Id: string;
    OrderId: string;
    MeasurementId: string;
    Value: string;
    CreateDate: string;
    CreateUserId: string;
    ModifyDate: string;
    ModifyUserId: string;
    StatusId: string;
    Name?: string;

    constructor() {
        this.Id = '';
        this.OrderId = '';
        this.MeasurementId = '';
        this.Value = '';
        this.CreateDate = '';
        this.CreateUserId = '';
        this.ModifyDate = '';
        this.ModifyUserId = '';
        this.StatusId = '';
    }
}
