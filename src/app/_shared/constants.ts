import { ConfirmationPageModel } from '.';

export const CURRENT_USER = 'currentUser';


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

      }
    ]
  },

];