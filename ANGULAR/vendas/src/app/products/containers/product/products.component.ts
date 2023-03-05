import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OperacaoCrud, TypeSearchProduct } from 'src/app/shared/enum/enum';
import { Product } from '../../models/product.model';
import { ProductCreateComponent } from '../product-create/product-create.component';
import { ProductService } from '../../services/product.service';
import { ProductFilterSearch } from '../../models/product-filter-search';
import { catchError, Observable, of } from 'rxjs';
import { NotificationsService } from 'src/app/shared/services/notifications/notifications.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products$: Observable<Product[]>;

  productFilterSearch: ProductFilterSearch = {
    typeSearch: TypeSearchProduct.Code,
    textSearch: '',
  };

  constructor(
    public dialog: MatDialog,
    private productService: ProductService,
    private notificationsService: NotificationsService
  ) {
    this.products$ = of([]);
  }

  ngOnInit(): void {}

  ngOnDestroy() {}

  add(): void {
    const dialogRef = this.dialog.open(ProductCreateComponent, {
      data: {
        OperacaoCrud: OperacaoCrud.Create,
        id: 0,
      },
    });

    dialogRef.afterClosed().subscribe((idProduct) => {
      if (!isNaN(idProduct)) {
        this.productFilterSearch.textSearch = idProduct.toString();
        this.productFilterSearch.typeSearch = TypeSearchProduct.id;
        this.search(this.productFilterSearch);
      }
    });
  }

  edit(id: number) {
    const dialogRef = this.dialog.open(ProductCreateComponent, {
      data: {
        operacaoCrud: OperacaoCrud.Update,
        id: id,
      },
    });

    dialogRef.afterClosed().subscribe((idProduct) => {
      if (!isNaN(idProduct)) {
        this.productFilterSearch.textSearch = idProduct.toString();
        this.productFilterSearch.typeSearch = TypeSearchProduct.id;
        this.search(this.productFilterSearch);
      }
    });
  }

  delete(id: number) {
    const dialogRef = this.dialog.open(ProductCreateComponent, {
      data: {
        operacaoCrud: OperacaoCrud.Delete,
        id: id,
      },
    });
  }

  search(productFilterInfo: ProductFilterSearch) {
    switch (productFilterInfo.typeSearch) {
      case TypeSearchProduct.Description: {
        this.productService
          .getByDescription(productFilterInfo.textSearch.toString())
          .subscribe({
            next: (products) => {
              if (products != null) this.products$ = of(products);
            },
            error: () => {
              this.notificationsService.showMessage(
                'Ocorreu um erro ao buscar os produtos!'
              );
            },
          });
        break;
      }
      case TypeSearchProduct.Code: {
        this.productService
          .getByCode(productFilterInfo.textSearch.toString())
          .subscribe({
            next: (products) => {
              if (products != null) this.products$ = of(products);
            },
            error: () => {
              this.notificationsService.showMessage(
                'Ocorreu um erro ao buscar os produtos!'
              );
            },
          });
        break;
      }
      case TypeSearchProduct.id: {
        this.productService
          .getById(Number(productFilterInfo.textSearch))
          .subscribe({
            next: (product) => {
              if (product != null) this.products$ = of([product]);
            },
            error: () => {
              this.notificationsService.showMessage(
                'Ocorreu um erro ao buscar os produtos!'
              );
            },
          });
        break;
      }
    }
  }
}
