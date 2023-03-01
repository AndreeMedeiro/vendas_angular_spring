import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductCreateComponent } from './../../components/products/product-create/product-create.component';
import { OperacaoCrud } from './../../shared/enum/enum';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog(): void {
    const dialogRef = this.dialog.open(ProductCreateComponent, {
      data: {
        OperacaoCrud: OperacaoCrud.Create,
        id: 0,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
