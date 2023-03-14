
import { CustomerCrudComponent } from 'src/app/customers/containers/customer-crud/customer-crud.component';
import { Customer } from '../../../customers/models/customer.model';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomersService } from '../../../customers/services/customers.service';
import { OperacaoCrud } from 'src/app/shared/enum/enum';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css'],
})
export class CustomersListComponent implements OnInit {

  customers: Customer[] = [];

  columnsToDisplay = ['id', 'nome', 'cpf', 'telefone', 'email',  'action'];

  constructor(private customerService: CustomersService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.customerService.emitirPesquisaCliente.subscribe(customers => {
      this.customers = customers
    })

  }

  deleteClick(id: number) {
    const dialogRef = this.dialog.open(CustomerCrudComponent, {
      data: {
        operacaoCrud: OperacaoCrud.Delete,
        id: id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  editClick(id: number) {
    const dialogRef = this.dialog.open(CustomerCrudComponent, {
      data: {
        operacaoCrud: OperacaoCrud.Update,
        id: id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
