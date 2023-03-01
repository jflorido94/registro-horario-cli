import { Routes } from '@angular/router';
import { HistorialComponent } from './historial.component';

export const HistorialRouter: Routes = [
  {
    path: '',
    component: HistorialComponent,
    data: { animation: 'historial' },
  },
];
