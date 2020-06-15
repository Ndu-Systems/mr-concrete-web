import { ConfirmationPageModel } from '.';
import { CompanyTypeModel } from '../_models';

export const CURRENT_USER = 'currentUser';
export const CURRENT_NAV = 'currentNavigate';

export const ORDER_PLACEMENT_CONFIRMATION: ConfirmationPageModel = {
  heading: 'Supplier orders',
  subheading: 'Order status updated',
  text: 'Thank you for your update, the relevant stakeholders have been notified.',
  positiveNavLabel: 'View order',
  positiveNavLink: 'dashboard/view-order',
  negativeNavLabel: 'Done',
  negativeNavLink: 'dashboard/orders',
  actionLink: 'dashboard/orders',
  actionLabel: 'Return to orders',
  type: 'Order',
  imgUrl: 'assets/images/dashboard/successfully.svg'
};

export interface Region {
  id: string;
  name: string;
  parentId?: string;
  subRegions?: Region[];
}

export const PROVINCE_LIST: Region[] = [
  {
    id: 'EC',
    name: 'Eastern Cape',
    subRegions: [
      {
        id: 'BISHO',
        name: 'Bhisho',
        parentId: 'EC'
      }
    ]
  },
  {
    id: 'FS',
    name: 'Free State',
    subRegions: [
      {
        id: 'BFN',
        name: 'Bloemfontein',
        parentId: 'FS'
      }
    ]
  },
  {
    id: 'GP',
    name: 'Gauteng',
    subRegions: [
      {
        id: 'JHB',
        name: 'Johannesburg',
        parentId: 'GP'

      }
    ]
  },
  {
    id: 'KZN',
    name: 'KwaZulu-Natal',
    subRegions: [
      {
        id: 'PMB',
        name: 'Pietermaritzburg',
        parentId: 'KZN'
      }
    ]
  },
  {
    id: 'WC',
    name: 'Western Cape',
    subRegions: [
      {
        id: 'CPT',
        name: 'Cape Town',
        parentId: 'WC'
      }
    ]
  }

];

export const ADDRESS_TYPE = [
  'Physical Address',
  'Postal Address',
  'Other',
];

// Local storage Model



export const COMPANY_VIEW = 'Company';
export const COMPANIES_VIEW = 'Companies';
export const USER_VIEW = 'userView';
export const ADDRESS_VIEW = 'addressView';
export const ADDRESSLIST_VIEW = 'addressListView';

export const STATUSES = {
  PENDING: 1,
  ACCEPTED: 2,
  INPROGRESS: 3,
  ONITSWAY: 4,
  COMPLETED: 5,
  CANCELLED: 6,
  DECLINEDBYCUSTOMER: 7,
  DECLINEDBYSUPPLIER: 8
};


export const COMPANY_TYPES_LIST: CompanyTypeModel[] = [
  {
    Type: 'HeadQuarters',
    DisplayName: 'Head Quarters',
    Description: 'Head Quarters of the group',
  },
  {
    Type: 'Branch',
    DisplayName: 'Branch Office',
    Description: 'A division/branch of the group',
  },
  {
    Type: 'Sub-Branch',
    DisplayName: 'Sub Branch',
    Description: 'A division of the main branch',
  },
  {
    Type: 'Workspace',
    DisplayName: 'Workspace area',
    Description: 'A shared environment with other companies',
  },

]
