import { Endereco } from './../../../model/endereco.model';
import { CustomerCrudComponent } from 'src/app/components/customers/customer-crud/customer-crud.component';
import { Customer } from './../../../model/customer.model';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomersService } from '../customers.service';
import { OperacaoCrud } from 'src/app/shared/enum/enum';
import { animate, state, style, transition, trigger } from '@angular/animations';

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
