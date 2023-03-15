
import { OrdersListComponent } from './components/orders/orders-list/orders-list.component';
import { SalesListComponent } from './components/sales/sales-list/sales-list.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductCreateComponent } from './products/containers/product-create/product-create.component';
import { CustomersComponent } from './customers/containers/customers/customers.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  {
    path: 'products',
    loadChildren: () =>
      import('./products/products.module').then(
        (m) => m.ProductsModule
      ),
  },
  {
    path: 'customers',
    loadChildren: () =>
      import('./customers/customers.module').then(
        (c) => c.CustomersModule
      ),
  },

  { path: 'dashboard', component: DashboardComponent },
  { path: 'product-create', component: ProductCreateComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'orders', component: OrdersListComponent },
  { path: 'sales', component: SalesListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
