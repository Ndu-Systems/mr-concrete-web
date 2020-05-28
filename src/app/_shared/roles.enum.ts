import { PersonaModel } from '../_models';

export enum Roles {
  ADMIN = 'Admin',
  SUPPLIER = 'Supplier',
  ENGINEER = 'Engineer',
  CUSTOMER = 'Customer'
}



export enum PersonaTypes {
  BUILDING_BUSINESS = 'I am building a business idea',
  MOVING_PROCESS = 'I am taking my business online',
  GUEST = 'I am only visiting',
}

export const PERSONA_LIST: PersonaModel[] = [

  {
    Description: PersonaTypes.BUILDING_BUSINESS,
    Key: 'BUILDING_BUSINESS'
  },
  {
    Description: PersonaTypes.MOVING_PROCESS,
    Key: 'MOVING_PROCESS'
  },
  {
    Description: PersonaTypes.GUEST,
    Key: 'GUEST'
  }
];
