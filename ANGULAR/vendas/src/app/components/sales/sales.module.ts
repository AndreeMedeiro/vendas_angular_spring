import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesListComponent } from './sales-list/sales-list.component';



@NgModule({
  declarations: [
    SalesListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SalesListComponent
  ]
})
export class SalesModule { }
