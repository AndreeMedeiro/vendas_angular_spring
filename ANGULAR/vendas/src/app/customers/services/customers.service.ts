import { HttpClient, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, delay, EMPTY, lastValueFrom, map, Observable } from 'rxjs';
import { Customer } from 'src/app/customers/models/customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  // baseUrl = 'http://localhost:3000/customers'
  baseUrl = 'api/customers';

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  create(Customer: any): Observable<Customer> {
    return this.http.post<Customer>(this.baseUrl, Customer).pipe();
  }

  getById(id: string) {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Customer>(url);
  }

  getByEmail(email: string) {
    const url = `${this.baseUrl}/email/${email}`;
    return this.http.get<Customer[]>(url).pipe();
  }

  getByCpfCnpj(cpfCnpj: string) {
    const url = `${this.baseUrl}/cpfCnpj/${cpfCnpj}`;
    return this.http.get<Customer[]>(url).pipe();
  }

  getByName(name: string) {
    const url = `${this.baseUrl}/name/${name}`;
    return this.http.get<Customer[]>(url).pipe();
  }

  getByTel(tel: string) {
    const url = `${this.baseUrl}/tel/${tel}`;
    return this.http.get<Customer[]>(url).pipe(delay(2000));
  }

  update(customer: any): Observable<Customer> {
    console.log(customer);
    const url = `${this.baseUrl}/${customer.id}`;
    let customerList: Customer[] = [];
    return this.http.put<Customer>(url, customer);
  }

  deleteById(id: string) {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url);
  }
}
