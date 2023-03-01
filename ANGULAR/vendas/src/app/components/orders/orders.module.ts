import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersListComponent } from './orders-list/orders-list.component';



@NgModule({
  declarations: [
    OrdersListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    OrdersListComponent
  ]
})
export class OrdersModule { }
