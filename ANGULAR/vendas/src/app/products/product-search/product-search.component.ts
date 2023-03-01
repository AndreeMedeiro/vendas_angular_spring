import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, of } from 'rxjs';
import { OperacaoCrud, TipoPesquisaCliente, TypeSearchProduct } from 'src/app/shared/enum/enum';
import { NotificationsService } from 'src/app/shared/services/notifications/notifications.service';
import { ProductCreateComponent } from '../product-create/product-create.component';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent {
  typeSearchProduct: TypeSearchProduct;
  searchText: String = ''

  constructor(
    public dialog: MatDialog,
    private productService: ProductService,
  ) {
    this.typeSearchProduct = TypeSearchProduct.Code
  }

  toggleTipoPesquisa(tipo: TypeSearchProduct) {
    console.log(tipo);
    this.typeSearchProduct = tipo;

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ProductCreateComponent, {
      data: {
        OperacaoCrud: OperacaoCrud.Create,
        id:0
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  async search() {
    switch (this.typeSearchProduct) {
      case TypeSearchProduct.Description: {
        this.productService.readByDescription(this.searchText.toString());
        break;
      }
      case TypeSearchProduct.Code: {
        this.productService.readByCode(this.searchText.toString())
        break;
      }
    }
  }

}
