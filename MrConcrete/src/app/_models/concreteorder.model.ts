import { Concreteordermeasurements } from '.';

export class Concreteorder {
    OrderId = '';
    UserId = '';
    ProjectCode = '';
    OrderNumber = '';
    SupplierId = '';
    OrderDate = '';
    DeliveryDate = '';
    TruckArrivalTime = '';
    Directions = '';
    SpecialInstructions = '';
    CategoryId = '';
    CreateDate = '';
    CreateUserId = '';
    ModifyDate = '';
    ModifyUserId = '';
    StatusId = 1;
    constructor() {
        this.OrderId = '';
        this.UserId = '';
        this.ProjectCode = '';
        this.OrderNumber = 'O782372';
        this.SupplierId = '';
        this.OrderDate = '';
        this.DeliveryDate = '';
        this.TruckArrivalTime = '';
        this.Directions = '';
        this.SpecialInstructions = '';
        this.CategoryId = '';
        this.CreateDate = '';
        this.CreateUserId = '';
        this.ModifyDate = '';
        this.ModifyUserId = '';
        this.StatusId = 1;
    }
}

export class Order {
    constructor() {
        this.concreteorder = new Concreteorder();
    }
    concreteorder: Concreteorder;
    concreteordermeasurements: Concreteordermeasurements[] = [];
}
