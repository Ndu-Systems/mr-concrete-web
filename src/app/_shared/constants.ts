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
