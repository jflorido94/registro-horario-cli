import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistorialComponent } from './historial.component';
import { RouterModule } from '@angular/router';
import { HistorialRouter } from './historial.routing';

@NgModule({
  declarations: [HistorialComponent],
  imports: [CommonModule, RouterModule.forChild(HistorialRouter)],
})
export class HistorialModule {}
