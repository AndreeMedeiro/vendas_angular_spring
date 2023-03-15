
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { MaterialModule } from '../shared/material/material.module';
import { CustomerSearchComponent } from './components/customer-search/customer-search.component';
import { CustomersListComponent } from './components/customers-list/customers-list.component';
import { CustomerCrudComponent } from './containers/customer-crud/customer-crud.component';
import { CustomersComponent } from './containers/customers/customers.component';
import { CustomersRoutingModule } from './customers-routing.module';





@NgModule({
  declarations: [CustomersListComponent,
    CustomersComponent,
    CustomerCrudComponent,
    CustomerSearchComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    MaterialModule,
    CustomersRoutingModule
  ],
  exports: [
    CommonModule,
    CustomersListComponent,
    CustomersComponent,
    CustomerCrudComponent,


  ]
})
export class CustomersModule { }
