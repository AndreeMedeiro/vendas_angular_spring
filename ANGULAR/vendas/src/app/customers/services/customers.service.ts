
import { HttpClient, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, delay, EMPTY, lastValueFrom, map, Observable } from 'rxjs';
import { Customer } from 'src/app/customers/models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  emitirPesquisaCliente = new EventEmitter<Customer[]>;

  // baseUrl = 'http://localhost:3000/customers'
  baseUrl = 'api/customers'


  constructor(private http: HttpClient,
    private snackBar: MatSnackBar) { }

    read(): Observable<Customer[]> {
      return this.http.get<Customer[]>(this.baseUrl).pipe(
        catchError(err =>{
        return this.errorHandler(err)
      }
      ))
    }

    create(Customer: any): Observable<Customer> {
      console.log(Customer)
      return this.http.post<Customer>(this.baseUrl,Customer).pipe(map(obj =>obj),
      catchError(e =>{
        return this.errorHandler(e)
        })
      );

    }

    readById(id:string): Observable<Customer>{
      const url = `${this.baseUrl}/${id}`
      var customer = this.http.get<Customer>(url)
      return customer
    }

    async readById2(id:string): Promise<Customer[]>{
      const url = `${this.baseUrl}/${id}`
      let customerList: Customer[] = [];

      await new Promise(f => setTimeout(f, 5000));

      await lastValueFrom(this.http.get<Customer>(url)).then( customer =>{
        customerList.push(customer);

      })
      .catch(error =>{
        this.errorHandler(error)
        customerList = []
      });

      this.emitirPesquisaCliente.emit(customerList)
      return customerList
    }

    async readByEmail(email:string): Promise<Customer[]>{
      let params = new HttpParams();
      params = params.append('email', email);
      let customerList: Customer[] = [];
      await lastValueFrom(this.http.get<Customer[]>(this.baseUrl, {params:params})).then( Customers =>{
        customerList = Customers;
      })
      .catch(error =>{
        this.errorHandler(error)
        customerList = []
      });
      this.emitirPesquisaCliente.emit(customerList)
      return customerList;
    }

    async readByCpf(cpf:string): Promise<Customer[]>{
      let params = new HttpParams();
      params = params.append('cpf', cpf);
      let customerList: Customer[] = [];
      await lastValueFrom(this.http.get<Customer[]>(this.baseUrl, {params:params})).then( Customers =>{
        customerList = Customers;
      })
      .catch(error =>{
        this.errorHandler(error)
        customerList = []
      });
      this.emitirPesquisaCliente.emit(customerList)
      return customerList;
    }

    async readByNome(nome:string): Promise<Customer[]>{
      let params = new HttpParams();
      params = params.append('nome', nome);
      let customerList: Customer[] = [];
      await lastValueFrom(this.http.get<Customer[]>(this.baseUrl, {params:params})).then( Customers =>{
        customerList = Customers;
      })
      .catch(error =>{
        this.errorHandler(error)
        customerList = []
      });
      this.emitirPesquisaCliente.emit(customerList)
      return customerList;
    }

    async readByCelular(celular:string): Promise<Customer[]>{
      let params = new HttpParams();
      params = params.append('celular', celular);
      let customerList: Customer[] = [];
      await lastValueFrom(this.http.get<Customer[]>(this.baseUrl, {params:params})).then( Customers =>{
        customerList = Customers;
      })
      .catch(error =>{
        this.errorHandler(error)
        customerList = []
      });
      this.emitirPesquisaCliente.emit(customerList)
      return customerList;
    }

    update(customer: any): Observable<Customer>{
      console.log(customer)
      const url = `${this.baseUrl}/${customer.id}`
      let customerList: Customer[] = [];
      return this.http.put<Customer>(url,customer)
    }

    deleteById(id:string){
      const url = `${this.baseUrl}/${id}`
      return this.http.delete(url)
    }

    showMessage(msg: string, isError: boolean = false): void {
      console.log('teste')
      this.snackBar.open(msg, 'X', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: isError ? ['msg-error'] : ['msg-sucess']
      })
    }

    errorHandler(e: any): Observable<any> {
      console.log(e)
      this.showMessage('Ocorreu um erro!', true);
      return EMPTY;
    }
}
