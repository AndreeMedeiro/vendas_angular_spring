import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OperacaoCrud } from 'src/app/shared/enum/enum';
import { ProductCreateComponent } from '../../product-create/product-create.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialogAdd(): void {
    const dialogRef = this.dialog.open(ProductCreateComponent, {
      data: {
        OperacaoCrud: OperacaoCrud.Create,
        id: 0,
      },
    });

    // dialogRef.afterClosed().subscribe((result) => {});
  }
}
