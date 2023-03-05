import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, delay, first } from 'rxjs/operators';
import { NotificationsService } from 'src/app/shared/services/notifications/notifications.service';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // baseUrl = 'http://localhost:3000/products'
  // private readonly baseUrl = 'http://192.168.0.5:8080/api/products';
  private readonly baseUrl = 'api/products';

  constructor(
    private http: HttpClient,
    private notificationsService: NotificationsService
  ) {}

  get(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl).pipe(first());
  }

  create(product: any): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product).pipe(first());
  }

  getById(id: number): Observable<Product> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Product>(url);
  }

  getByCode(codigo: string) {
    const url = `${this.baseUrl}/Code/${codigo}`;
    return  this.http.get<Product[]>(url).pipe(
      first()
      // ,delay(1000)
      );
  }

  getByDescription(description: string) {
    const url = `${this.baseUrl}/description/${description}`;
    return this.http.get<Product[]>(url).pipe(delay(2000));
  }

  update(product: any): Observable<Product> {
    console.log(product);
    const url = `${this.baseUrl}/${product.id}`;
    return this.http.put<Product>(url, product);
  }

  deleteById(id: string) {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url);
  }
}
