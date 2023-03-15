import { Component, EventEmitter, Output } from '@angular/core';
import { TypeSearchCustomer } from 'src/app/shared/enum/enum';
import { CustomerFilterSearch } from '../../models/customer-filter-search';

@Component({
  selector: 'app-customer-search',
  templateUrl: './customer-search.component.html',
  styleUrls: ['./customer-search.component.css'],
})
export class CustomerSearchComponent {
  @Output() add: EventEmitter<''> = new EventEmitter(false);

  @Output() infoCustomerSearch: EventEmitter<CustomerFilterSearch> =
    new EventEmitter(false);

  customerFilterSearch: CustomerFilterSearch = {
    typeSearch: TypeSearchCustomer.Name,
    textSearch: '',
  };

  typeSearchCustomer: TypeSearchCustomer;
  maskTextSearch: string = '';
  textSearch: string = '';
  typeInputTextSearch = 'text';

  constructor() {
    this.typeSearchCustomer = TypeSearchCustomer.Name;
  }

  addClick(): void {
    this.add.emit('');
  }

  toggleTypeSearch(type: TypeSearchCustomer) {
    this.typeSearchCustomer = type;

    switch (type) {
      case TypeSearchCustomer.CpfCnpj: {
        this.maskTextSearch = 'CPF_CNPJ';
        break;
      }
      case TypeSearchCustomer.Tel: {
        this.maskTextSearch = '(00) 00000-0000';
        break;
      }
      default: {
        this.maskTextSearch = '';
        break;
      }
    }

    if (type == TypeSearchCustomer.Id) {
      this.typeInputTextSearch = 'number';
    } else {
      this.typeInputTextSearch = 'text';
    }
  }

  search() {
    this.customerFilterSearch.typeSearch = this.typeSearchCustomer;
    this.customerFilterSearch.textSearch = this.textSearch;

    this.infoCustomerSearch.emit(this.customerFilterSearch);
  }
}
