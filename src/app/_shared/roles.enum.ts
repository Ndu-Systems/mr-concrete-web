import { PersonaModel, RoleEnumModel } from '../_models';

export enum Roles {
  ADMIN = 'Admin',
  SUPPLIER = 'Supplier',
  ENGINEER = 'Engineer',
  CUSTOMER = 'Customer',
  DRIVER = 'Driver',
  ASSISTANT = 'Assistant',
  GENERAL = 'General'
}


export enum PersonaTypes {

  SYSTEM_CONTROLLER = 'I drive the system lifecycle and support',
  MOVING_PROCESS = 'I am taking my business online',
  CUSTOMER = 'I want to place orders',
  GUEST = 'I am only visiting',
}
export const SYSTEM_ROLES: RoleEnumModel[] = [{
  Id: '1',
  Key: Roles.ADMIN,
  Description: PersonaTypes.SYSTEM_CONTROLLER,
}, {
  Id: '3',
  Key: Roles.SUPPLIER,
  Description: PersonaTypes.MOVING_PROCESS,
}, {
  Id: '5',
  Key: Roles.CUSTOMER,
  Description: PersonaTypes.CUSTOMER,
} ];

export const PERSONA_LIST: PersonaModel[] = [
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


