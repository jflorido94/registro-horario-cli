import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthInterceptor } from "@core/interceptors/auth.interceptor";

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { IonicStorageModule } from "@ionic/storage-angular";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    IonicStorageModule.forRoot(),
    HttpClientModule,

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true},
  ]
})
export class CoreModule { }
