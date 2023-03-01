import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { lastValueFrom, Observable, of } from 'rxjs';
import { catchError, delay, first, tap } from 'rxjs/operators';
import { NotificationsService } from 'src/app/shared/services/notifications/notifications.service';
import { Product } from '../../model/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // baseUrl = 'http://localhost:3000/products'
  // private readonly baseUrl = 'http://192.168.0.5:8080/api/products';
  private readonly baseUrl = 'api/products';

  searchProductListEmitter = new EventEmitter<Product[]>();


  constructor(
    private http: HttpClient,
    private notiticationService: NotificationsService
  ) {}

  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl).pipe(
      first(),
    )
  }

  create(product: any): Observable<Product> {
    console.log(product);
    return this.http.post<Product>(this.baseUrl, product).pipe();
  }

  readById(id: number): Observable<Product> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Product>(url);
  }

  async readByIdList(id: number): Promise<Product[]> {
    const url = `${this.baseUrl}/${id}`;
    let productList: Product[] = [];
    await lastValueFrom(this.http.get<Product>(url))
      .then((products) => {
        productList.push(products);
        this.searchProductListEmitter.emit(productList);
      })
      .catch((error) => {
        this.notiticationService.showMessage(
          'Ocorreu um erro ao buscar os produtos!'
        );
        return [];
      });

    return productList;

  }

  async readByCode(codigo: string): Promise<Product[]> {
    const url = `${this.baseUrl}/Code/${codigo}`;

    let productList: Product[] = [];

    await lastValueFrom(this.http.get<Product[]>(url))
      .then((products) => {
        productList = products;
        this.searchProductListEmitter.emit(productList);
      })
      .catch((error) => {
        this.notiticationService.showMessage(
          'Ocorreu um erro ao buscar os produtos!'
        );
        return [];
      });

    return productList;
  }

  async readByDescription(description: string): Promise<Product[]> {
    const url = `${this.baseUrl}/description/${description}`;
    let productList: Product[] = [];
    await lastValueFrom(this.http.get<Product[]>(url))
      .then((products) => {
        productList = products;
        this.searchProductListEmitter.emit(productList);
      })
      .catch((error) => {
        this.notiticationService.showMessage(
          'Ocorreu um erro ao buscar os produtos!'
        );
        return [];
      });

    return productList;
  }
  update(product: any): Observable<Product> {
    console.log(product);
    const url = `${this.baseUrl}/${product.id}`;
    //return this.http.put<Product>(url, product);
    return this.http.put<Product>(url, product);
  }

  deleteById(id: string) {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url);
  }

  // showMessage(msg: string, isError: boolean = false): void {
  //   console.log('teste')
  //   this.snackBar.open(msg, 'X', {
  //     duration: 3000,
  //     horizontalPosition: 'right',
  //     verticalPosition: 'top',
  //     panelClass: isError ? ['msg-error'] : ['msg-sucess']
  //   })
  // }

  // errorHandler(e: any): Observable<any> {
  //   console.log(e)
  //   this.showMessage('Ocorreu um erro!', true);
  //   return EMPTY;
  // }
}
