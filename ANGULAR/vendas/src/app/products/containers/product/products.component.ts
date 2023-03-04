import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OperacaoCrud, TypeSearchProduct } from 'src/app/shared/enum/enum';
import { Product } from '../../models/product.model';
import { ProductCreateComponent } from '../product-create/product-create.component';
import { ProductService } from '../../services/product.service';
import { ProductFilterSearch } from '../../models/product-filter-search';
import { Observable, of } from 'rxjs';

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
    private productService: ProductService
  ) {
    this.products$ = of([])
  }

  ngOnInit(): void {
    this.productService.searchProductListEmitter.subscribe((products) => {
      this.products$ = products;
      console.log(products);
    });
  }

  ngOnDestroy() { }

  add(): void {
    const dialogRef = this.dialog.open(ProductCreateComponent, {
      data: {
        OperacaoCrud: OperacaoCrud.Create,
        id: 0,
      },
    });

    dialogRef.afterClosed().subscribe((idProduct) => {
      if (!isNaN(idProduct)) {
        this.productFilterSearch.textSearch = idProduct.toString()
        this.productFilterSearch.typeSearch = TypeSearchProduct.id
        this.search(this.productFilterSearch)
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
        this.productFilterSearch.textSearch = idProduct.toString()
        this.productFilterSearch.typeSearch = TypeSearchProduct.id
        this.search(this.productFilterSearch)
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

    // dialogRef.afterClosed().subscribe((result) => {
    //   console.log('The dialog was closed');
    // });
  }

  search(productFilterInfo: ProductFilterSearch) {

    switch (productFilterInfo.typeSearch) {
      case TypeSearchProduct.Description: {
        this.products$ = this.productService.getByDescription(productFilterInfo.textSearch.toString());
        break;
      }
      case TypeSearchProduct.Code: {
        this.products$ = this.productService.getByCode(productFilterInfo.textSearch.toString())
        break;
      }
      case TypeSearchProduct.id: {
        this.productService.getById(Number(productFilterInfo.textSearch)).subscribe(product => {
          if (product != null)
          this.products$ = of([product])
        })
        break;
      }
    }
  }
}

