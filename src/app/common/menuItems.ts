import { RouteInfo } from './interfaces';

const ROUTER_COMMON = [
  {
    path: '/registro',
    title: 'inicio',
    id: 'sibar-registro',
    icon: 'fas fa-home fa-fw',
    class: 'yellow',
  },
  {
    path: '/historial',
    title: 'historial',
    id: 'sibar-historial',
    icon: 'fas fa-clock  fa-fw',
    class: 'yellow',
  },
];

export const ROUTES: RouteInfo[] = [
  ...ROUTER_COMMON,
  {
    path: '/calendar-admin',
    title: 'calendario',
    id: 'sibar-calendar-admin',
    icon: 'fas fa-calendar fa-fw',
    class: 'yellow',
  },
  {
    path: '/settings',
    title: 'opciones',
    id: 'sibar-settings',
    icon: 'fas fa-cogs fa-fw',
    class: 'azure',
  },
];

export const ROUTES_EMPLOYEE: RouteInfo[] = [
  ...ROUTER_COMMON,
  {
    path: '/calendar-view',
    title: 'calendario',
    id: 'sibar-calendar-view',
    icon: 'fas fa-calendar fa-fw',
    class: 'yellow',
  },
  {
    path: '/user-profile',
    title: 'perfil',
    id: 'sibar-user-profile',
    icon: 'fas fa-wrench fa-fw',
    class: 'azure',
  },
];
