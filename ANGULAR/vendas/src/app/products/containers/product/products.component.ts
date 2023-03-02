import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OperacaoCrud } from 'src/app/shared/enum/enum';
import { Product } from '../../models/product.model';
import { ProductCreateComponent } from '../product-create/product-create.component';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(
    public dialog: MatDialog,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.productService.searchProductListEmitter.subscribe((products) => {
      this.products = products;
      console.log(products);
    });
  }

  ngOnDestroy() {}

  add(): void {
    this.dialog.open(ProductCreateComponent, {
      data: {
        OperacaoCrud: OperacaoCrud.Create,
        id: 0,
      },
    });

    // dialogRef.afterClosed().subscribe((result) => {});
  }

  edit(id: number) {
    const dialogRef = this.dialog.open(ProductCreateComponent, {
      data: {
        operacaoCrud: OperacaoCrud.Update,
        id: id,
      },
    });

    // dialogRef.afterClosed().subscribe((result) => {
    //   console.log('The dialog was closed');
    // });
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
}
