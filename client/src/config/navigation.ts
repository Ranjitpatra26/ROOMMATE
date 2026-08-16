import {
  Compass,
  Box,
  Flame,
  Home,
  MessageSquare,
  ShieldCheck,
  User,
  Plane,
  Receipt,
  FileText,
  LifeBuoy,
} from 'lucide-react';

export interface NavItemConfig {
  id: string;
  name: string;
  path: string;
  icon: any;
  category: 'primary' | 'operational' | 'profile';
  description?: string;
}

export const MAIN_NAV_ITEMS: NavItemConfig[] = [
  {
    id: 'discover',
    name: 'Discover',
    path: '/discover',
    icon: Compass,
    category: 'primary',
    description: 'Find compatible roommates & curated spaces',
  },
  {
    id: 'spaces',
    name: 'Spaces',
    path: '/spatial',
    icon: Box,
    category: 'primary',
    description: '3D spatial districts & room models',
  },
  {
    id: 'compatibility',
    name: 'Compatibility Lab',
    path: '/compatibility-lab',
    icon: Flame,
    category: 'primary',
    description: 'Multidimensional lifestyle resonance',
  },
  {
    id: 'living-os',
    name: 'Living OS',
    path: '/stay',
    icon: Home,
    category: 'primary',
    description: 'Daily household rhythms & responsibilities',
  },
  {
    id: 'travel',
    name: 'Travel Mode',
    path: '/travel',
    icon: Plane,
    category: 'primary',
    description: 'Nomadic lifestyle sync across India',
  },
];

export const OPERATIONAL_NAV_ITEMS: NavItemConfig[] = [
  {
    id: 'expenses',
    name: 'Expenses',
    path: '/stay/expenses',
    icon: Receipt,
    category: 'operational',
    description: 'Shared household ledger & UPI settlements',
  },
  {
    id: 'agreement',
    name: 'Agreement',
    path: '/stay/agreement/builder',
    icon: FileText,
    category: 'operational',
    description: 'Living agreement & house standards',
  },
  {
    id: 'safety',
    name: 'Safety Center',
    path: '/stay/safety',
    icon: LifeBuoy,
    category: 'operational',
    description: '24/7 support & confidential reporting',
  },
];

export const PROFILE_NAV_ITEMS: NavItemConfig[] = [
  {
    id: 'messages',
    name: 'Messages',
    path: '/messages/general',
    icon: MessageSquare,
    category: 'profile',
    description: 'Direct roommate dialogues',
  },
  {
    id: 'trust',
    name: 'Trust Ledger',
    path: '/trust/me',
    icon: ShieldCheck,
    category: 'profile',
    description: 'Aadhaar KYC & verified stays',
  },
  {
    id: 'profile',
    name: 'My DNA',
    path: '/profile/me',
    icon: User,
    category: 'profile',
    description: 'Your verified roommate profile',
  },
];

/**
 * Checks whether a given navigation item is active based on the current location path.
 * Correctly accounts for nested and dynamic routes.
 */
export function isRouteActive(currentPath: string, targetPath: string): boolean {
  if (targetPath === '/' && currentPath === '/') {
    return true;
  }
  if (targetPath === '/discover') {
    return currentPath === '/discover' || currentPath.startsWith('/discover/');
  }
  if (targetPath === '/spatial') {
    return currentPath === '/spatial' || currentPath.startsWith('/rooms/');
  }
  if (targetPath === '/compatibility-lab') {
    return currentPath === '/compatibility-lab' || currentPath.startsWith('/matches/');
  }
  if (targetPath === '/stay') {
    return (
      currentPath === '/stay' ||
      currentPath === '/stay/expenses' ||
      currentPath === '/stay/agreement/builder' ||
      currentPath === '/stay/safety' ||
      currentPath.startsWith('/reviews/')
    );
  }
  if (targetPath === '/travel') {
    return currentPath === '/travel';
  }
  if (targetPath.startsWith('/messages')) {
    return currentPath.startsWith('/messages');
  }
  if (targetPath.startsWith('/trust')) {
    return currentPath.startsWith('/trust');
  }
  if (targetPath.startsWith('/profile')) {
    return currentPath.startsWith('/profile');
  }
  return currentPath === targetPath;
}
