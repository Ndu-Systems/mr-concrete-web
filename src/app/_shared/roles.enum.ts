import { PersonaModel, RoleEnumModel } from '../_models';

export enum Roles {
  ADMIN = 'Admin',
  SUPPLIER = 'Supplier',
  ENGINEER = 'Engineer',
  CUSTOMER = 'Customer'
}

export const SYSTEM_ROLES: RoleEnumModel[] = [{
  Key: Roles.ADMIN,
  Description: Roles.ADMIN,
}, {
  Key: Roles.SUPPLIER,
  Description: Roles.SUPPLIER,
}, {
  Key: Roles.CUSTOMER,
  Description: Roles.CUSTOMER,
},]

export enum PersonaTypes {
  BUILDING_BUSINESS = 'I am building a business idea',
  MOVING_PROCESS = 'I am taking my business online',
  CUSTOMER = 'I want to place orders',
  GUEST = 'I am only visiting',
}

export const PERSONA_LIST: PersonaModel[] = [

  {
    Description: PersonaTypes.BUILDING_BUSINESS,
    Key: 'Supplier'
  },
  {
    Description: PersonaTypes.MOVING_PROCESS,
    Key: 'Supplier'
  },
  {
    Description: PersonaTypes.CUSTOMER,
    Key: 'CUSTOMER'
  },
  {
    Description: PersonaTypes.GUEST,
    Key: 'Guest'
  }
];
