import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { FirstLogin } from './common/guards/first-login.guard';
import { IsLogged } from './common/guards/is-logged.guard';
import { CheckRole } from './common/guards/check-role.guard';
import { RoleAdmin } from './common/guards/role-admin.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'prefix',
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./layouts/auth-layout/auth-layout.module').then(
            (m) => m.AuthLayoutModule,
          ),
      },
    ],
  },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [FirstLogin, CheckRole, IsLogged],
    children: [
      {
        path: 'calendar-admin',
        canActivate: [RoleAdmin],
        loadChildren: () =>
          import('./pages/calendar-admin/calendar-admin.module').then(
            (m) => m.CalendarAdminModule,
          ),
      },
      {
        path: 'calendar-view',
        loadChildren: () =>
          import('./pages/calendar-view/calendar-view.module').then(
            (m) => m.CalendarViewModule,
          ),
      },
      {
        path: 'gest-calendario',
        loadChildren: () =>
          import('./pages/user-profile/user-profile.module').then(
            (m) => m.UserProfileModule,
          ),
      },
      {
        path: 'gest-usuarios',
        canActivate: [RoleAdmin],
        loadChildren: () =>
          import('./pages/settings/pages/manage-users/manage-users.module').then(
            (m) => m.ManageUsersModule,
          ),
      },
      {
        path: 'contacts',
        loadChildren: () =>
          import('./pages/contacts/contacts.module').then((m) => m.ContactsModule),
      },
      {
        path: 'jornadas',
        canActivate: [RoleAdmin],
        loadChildren: () =>
          import('./pages/settings/pages/schedule/schedule.module').then(
            (m) => m.ScheduleModule,
          ),
      },
      {
        path: 'motivos',
        canActivate: [RoleAdmin],
        loadChildren: () =>
          import('./pages/settings/pages/chargue/chargue.module').then(
            (m) => m.ChargueModule,
          ),
      },
      {
        path: 'registro',
        loadChildren: () =>
          import('./pages/registro/registro.module').then((m) => m.RegistroModule),
      },
      {
        path: 'historial',
        loadChildren: () => import('./pages/historial/historial.module').then((m) => m.HistorialModule),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./pages/settings/settings.module').then((m) => m.SettingsModule),
      },
      {
        path: 'types',
        canActivate: [RoleAdmin],
        loadChildren: () =>
          import('./pages/settings/pages/types/types.module').then((m) => m.TypesModule),
      },
      {
        path: 'licence',
        canActivate: [RoleAdmin],
        loadChildren: () =>
          import('./pages/settings/pages/licence/licence.module').then(
            (m) => m.LicenceModule,
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
