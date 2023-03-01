import { ProductCreateComponent } from './components/products/product-create/product-create.component';

import { OrdersListComponent } from './components/orders/orders-list/orders-list.component';
import { SalesListComponent } from './components/sales/sales-list/sales-list.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductsComponent } from './pages/products/products.component';
import { CustomersComponent } from './pages/customers/customers.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  {
    path: 'products',
    loadChildren: () =>
      import('./components/products/products.module').then(
        (m) => m.ProductsModule
      ),
  },

  { path: 'dashboard', component: DashboardComponent },
  // {path: 'products', component: ProductsComponent},
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
