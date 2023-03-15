import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material/material.module';
import { ProductsComponent } from './containers/product/products.component';
import { ProductCreateComponent } from './containers/product-create/product-create.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductSearchComponent } from './components/product-search/product-search.component';
import { ProductsRoutingModule } from './products-routing.module';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductsComponent,
    ProductCreateComponent,
    ProductSearchComponent,
  ],
  imports: [
    MaterialModule,
    CommonModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    ProductListComponent,
    ProductsComponent
  ]
})
export class ProductsModule { }
