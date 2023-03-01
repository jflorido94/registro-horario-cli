import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  menuItems: any[] = [
    {
      path: '/gest-usuarios',
      title: 'Gest. Usuarios',
      id: 'btn-manage-users',
      icon: 'fas fa-users-cog',

    },
    {
      path: '/jornadas',
      title: 'Conf. Jornadas',
      id: 'btn-schedule',
      icon: 'far fa-clock',
    },
    {
      path: '/motivos',
      title: 'Conf. Motivos',
      id: 'btn-motivos',
      icon: 'far fa-question-circle',
    },
    {
      path: '/gest-calendario',
      title: 'Gest. Calendario',
      id: 'btn-user-profile',
      icon: 'far fa-calendar-alt',
    },
    {
      path: '/types',
      title: 'Tipos',
      id: 'btn-types',
      icon: 'fa-brands fa-typo3',
    },
    {
      path: '/licence',
      title: 'Permisos',
      id: 'btn-licence',
      icon: 'fa-solid fa-ticket-simple',
    },
  ];
}
