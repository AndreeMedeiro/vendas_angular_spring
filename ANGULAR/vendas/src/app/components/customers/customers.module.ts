import { CustomersComponent } from './../../pages/customers/customers.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CustomerCrudComponent } from './customer-crud/customer-crud.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatGridListModule} from '@angular/material/grid-list';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import {MatIconModule} from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import { CustomerSearchComponent } from './customer-search/customer-search.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';




@NgModule({
  declarations: [CustomersListComponent,
    CustomersComponent,
    CustomerCrudComponent,
    CustomerSearchComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule ,
    MatInputModule,
    MatGridListModule,
    NgxMaskDirective,
    NgxMaskPipe,
    MatTableModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatRadioModule,
    FormsModule,
    MatProgressSpinnerModule
  ],
  exports: [
    CommonModule,
    CustomersListComponent,
    CustomersComponent,
    CustomerCrudComponent,


  ]
})
export class CustomersModule { }
