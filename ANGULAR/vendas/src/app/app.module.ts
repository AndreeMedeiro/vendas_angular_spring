import { OrdersModule } from './components/orders/orders.module';
import { CommonModule } from '@angular/common';
import { SalesModule } from './components/sales/sales.module';


import { HttpClientModule } from '@angular/common/http';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CustomersModule } from './customers/customers.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/template/header/header.component';
import { NavComponent } from './components/template/nav/nav.component';
import { SharedModule } from './shared/shared.module';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask} from 'ngx-mask';
import { ProductsModule } from './products/products.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';

// const maskConfig: Partial<IConfig> = {
//   validation: false,
// };

registerLocaleData(localePt);


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    DashboardComponent,


  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    ProductsModule,
    CustomersModule,
    OrdersModule,
    SalesModule,
    HttpClientModule,
    SharedModule,
    CustomersModule,
    MatDialogModule,
    NgxMaskDirective,
    NgxMaskPipe,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,

  ],
  providers: [ {provide: LOCALE_ID, useValue: 'PT-br'},
               {provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
               provideNgxMask()
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
