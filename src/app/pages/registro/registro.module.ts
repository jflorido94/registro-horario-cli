import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroRouter } from './registro.routing';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CountdownModule } from 'ngx-countdown';
import { RegistroComponent } from './registro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [RegistroComponent],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    CountdownModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    SweetAlert2Module.forRoot(),
    RouterModule.forChild(RegistroRouter),
  ],
})
export class RegistroModule {}
