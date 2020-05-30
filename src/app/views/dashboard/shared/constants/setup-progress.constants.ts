import { SetupProgressModel } from 'src/app/_models';

export const SETUP_ICONS: SetupProgressModel[] = [
  {
    icon: 'assets/images/dashboard/setup/company.svg',
    description: 'Set up company',
    cta: '/dashboard/',
    ctaName: 'complete company details',
    isComplete: true
  },
  {
    icon: 'assets/images/dashboard/setup/user.svg',
    description: 'Complete profile',
    cta: '/dashboard/',
    ctaName: 'complete profile',
    isComplete: true
  },
  {
    icon: 'assets/images/dashboard/setup/sell.svg',
    description: 'Add products to sell',
    cta: '/dashboard/create-product',
    ctaName: 'add product',
    isComplete: false
  }
];
