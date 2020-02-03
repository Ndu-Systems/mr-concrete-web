import { Concreteorder } from './concreteorder.model';
import { Concreteordermeasurements } from './concreteordermeasurements.model';

export class Order {
    constructor() {
        this.concreteorder = new Concreteorder();
    }
    concreteorder: Concreteorder;
    concreteordermeasurements: Concreteordermeasurements[] = [];
}
