import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OperacaoCrud, TipoPesquisaCliente } from 'src/app/shared/enum/enum';
import { CustomerCrudComponent } from '../customer-crud/customer-crud.component';
import { CustomersService } from '../customers.service';

@Component({
  selector: 'app-customer-search',
  templateUrl: './customer-search.component.html',
  styleUrls: ['./customer-search.component.css'],
})
export class CustomerSearchComponent {
  tipoPesquisaCliente: TipoPesquisaCliente;
  mascaraPesquisa: string = '';
  textoPesquisa: string = '';
  loading = false

  constructor(
    public dialog: MatDialog,
    private customerService: CustomersService
  ) {
    this.tipoPesquisaCliente = TipoPesquisaCliente.Nome;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CustomerCrudComponent, {
      // width:'700px',
      data: {
        OperacaoCrud: OperacaoCrud.Create,
        id: 0,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  toggleTipoPesquisa(tipo: TipoPesquisaCliente) {
    console.log(tipo);
    this.tipoPesquisaCliente = tipo;

    switch (tipo) {
      case TipoPesquisaCliente.Cpf: {
        this.mascaraPesquisa = 'CPF_CNPJ';
        break;
      }
      case TipoPesquisaCliente.Celular: {
        this.mascaraPesquisa = '(00) 00000-0000';
        break;
      }
      default: {
        this.mascaraPesquisa = '';
        break;
      }
    }
  }

  async search() {
    console.log(this.textoPesquisa)
    this.loading = true
    switch (this.tipoPesquisaCliente) {
      case TipoPesquisaCliente.Nome: {
        await this.customerService.readByNome(this.textoPesquisa);
        break;
      }
      case TipoPesquisaCliente.Email: {
        await this.customerService.readByEmail(this.textoPesquisa);
        break;
      }
      case TipoPesquisaCliente.Cpf: {
        await this.customerService.readByCpf(this.textoPesquisa);
        break;
      }
      case TipoPesquisaCliente.Celular: {
        await this.customerService.readByCelular(this.textoPesquisa);
        break;
      }
      case TipoPesquisaCliente.Id: {
        await this.customerService.readById2(this.textoPesquisa);
        break;
      }
      default: {
        break;
      }
    }
    this.loading = false
  }
}
