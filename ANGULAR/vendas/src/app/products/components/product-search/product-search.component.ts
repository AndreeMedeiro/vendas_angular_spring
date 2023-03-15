import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OperacaoCrud, TypeSearchProduct } from 'src/app/shared/enum/enum';;
import { ProductFilterSearch } from '../../models/product-filter-search';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css'],
})
export class ProductSearchComponent {

  @Output() infoProductSearch: EventEmitter<ProductFilterSearch> =
    new EventEmitter(false);

  @Output() add: EventEmitter<''> = new EventEmitter(false);

  typeInputSearch: String = 'text'

  productFilterSearch: ProductFilterSearch = {
    typeSearch: TypeSearchProduct.Code,
    textSearch: '',
  };
  typeSearchProduct: TypeSearchProduct;
  searchText: String = '';

  constructor(public dialog: MatDialog) {
    this.typeSearchProduct = TypeSearchProduct.Code;
  }

  toggleTypeSearch(tipo: TypeSearchProduct) {
    this.typeSearchProduct = tipo;

    if(this.typeSearchProduct == TypeSearchProduct.id){
      this.typeInputSearch = "number"
    }else{
      this.typeInputSearch = "text"
    }
  }

  addclick(): void {
    this.add.emit('');
  }

  async search() {
    this.productFilterSearch!.typeSearch = this.typeSearchProduct;
    this.productFilterSearch!.textSearch = this.searchText.toString();

    this.infoProductSearch.emit(this.productFilterSearch);
  }
}
