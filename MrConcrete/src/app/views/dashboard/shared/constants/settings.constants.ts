import { Actions } from './actions';

export const PARTNERS_CONSTANTS: Actions[] = [
  {
    name: 'suppliers',
    link: 'dashboard/suppliers',
    icon: 'assets/images/dashboard/settings/supplier.svg'
  },
  // {
  //   name: 'customers',
  //   link: 'dashboard/customers',
  //   icon: 'assets/images/dashboard/settings/customer.svg'
  // },
];


export const INDUSTRY_ACTION_CONSTANTS: Actions[] = [
  {
    name: 'categories',
    link: 'dashboard/categories',
    icon: 'assets/images/dashboard/settings/industry.svg'
  },
  {
    name: 'measurements',
    link: 'dashboard/measurements',
    icon: 'assets/images/dashboard/settings/industry.svg'
  },
]