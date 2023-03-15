import { Routes } from '@angular/router';
import { RegistroComponent } from './registro.component';

export const RegistroRouter: Routes = [
  {
    path: '',
    component: RegistroComponent,
    data: { animation: 'registro' },
  },
];
