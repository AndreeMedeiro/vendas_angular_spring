
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { OperacaoCrud, TypeSearchCustomer } from 'src/app/shared/enum/enum';
import { CustomerFilterSearch } from '../../models/customer-filter-search';
import { Customer } from '../../models/customer.model';
import { CustomersService } from '../../services/customers.service';
import { CustomerCrudComponent } from '../customer-crud/customer-crud.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers$: Observable<Customer[]>;

  customerFilterSearch: CustomerFilterSearch = {
    typeSearch: TypeSearchCustomer.Id,
    textSearch: '',
  };

  constructor(public dialog: MatDialog, private customerService: CustomersService) {

    this.customers$ = of([]);
  }

  ngOnInit(): void {}

  add(): void {
    const dialogRef = this.dialog.open(CustomerCrudComponent, {
      data: {
        OperacaoCrud: OperacaoCrud.Create,
        id: 0,
      },
    });

    dialogRef.afterClosed().subscribe((idCustomer) => {
      if (!isNaN(idCustomer)) {
        this.customerFilterSearch.textSearch = idCustomer.toString();
        this.customerFilterSearch.typeSearch = TypeSearchCustomer.Id;
        this.search(this.customerFilterSearch);
      }
    });
  }

  delete(id: number) {
    this.dialog.open(CustomerCrudComponent, {
      data: {
        operacaoCrud: OperacaoCrud.Delete,
        id: id
      }
    });

  }

  edit(id: number) {
    const dialogRef = this.dialog.open(CustomerCrudComponent, {
      data: {
        operacaoCrud: OperacaoCrud.Update,
        id: id
      }
    });

    dialogRef.afterClosed().subscribe(idCustomer => {
      if (!isNaN(idCustomer)) {
        this.customerFilterSearch.textSearch = idCustomer.toString();
        this.customerFilterSearch.typeSearch = TypeSearchCustomer.Id;
        this.search(this.customerFilterSearch);
      }
    });
  }

  search(customerFilterInfo: CustomerFilterSearch) {
    console.log('funcionou')
    switch (customerFilterInfo.typeSearch) {
      case TypeSearchCustomer.Name: {
        console.log(customerFilterInfo.textSearch.toString())
        this.customers$ =  this.customerService.getByName(customerFilterInfo.textSearch.toString());
        break;
      }
      case TypeSearchCustomer.Email: {
        this.customers$ = this.customerService.getByEmail(customerFilterInfo.textSearch.toString());
        break;
      }
      case TypeSearchCustomer.CpfCnpj: {
        this.customers$ = this.customerService.getByCpfCnpj(customerFilterInfo.textSearch.toString());
        break;
      }
      case TypeSearchCustomer.Tel: {
        this.customers$ = this.customerService.getByTel(customerFilterInfo.textSearch.toString());
        break;
      }
      case TypeSearchCustomer.Id: {
        this.customerService.getById(customerFilterInfo.textSearch.toString()).subscribe(customer => {
          if (customer != null) this.customers$ = of([customer]);
        })
        break;
      }
      default: {
        break;
      }
    }
  }

}
