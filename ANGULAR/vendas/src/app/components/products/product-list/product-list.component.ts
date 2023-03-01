import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { ProductService } from 'src/app/components/products/product.service';
import { OperacaoCrud } from 'src/app/shared/enum/enum';
import { ProductCreateComponent } from '../product-create/product-create.component';
import { NotificationsService } from 'src/app/shared/services/notifications/notifications.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  columnsToDisplay = ['id', 'codigo', 'descricao', 'preco', 'action'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource(this.products);


  ngAfterViewInit() {

   // this.dataSource.paginator = this.paginator;
   // this.dataSource = new MatTableDataSource(this.products);
  }

  constructor(
    private productService: ProductService,
    public dialog: MatDialog,
    private notificationService: NotificationsService,
    private liveAnnouncer: LiveAnnouncer
  ) {}


  ngOnInit(): void {
    this.productService.searchProductListEmitter.subscribe((products) => {
      this.products = products;
      this.dataSource = new MatTableDataSource(this.products);
      this.dataSource.paginator = this.paginator
      this.paginator._intl.itemsPerPageLabel = 'Itens por página'
      this.dataSource.sort = this.sort
    });
  }

  deleteClick(id: number) {
    const dialogRef = this.dialog.open(ProductCreateComponent, {
      data: {
        operacaoCrud: OperacaoCrud.Delete,
        id: id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  editClick(id: number) {
    const dialogRef = this.dialog.open(ProductCreateComponent, {
      data: {
        operacaoCrud: OperacaoCrud.Update,
        id: id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }


}
