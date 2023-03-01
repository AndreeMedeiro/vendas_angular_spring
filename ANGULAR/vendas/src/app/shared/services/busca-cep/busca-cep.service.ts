import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class BuscaCepService {

  private baseUrl = 'https://viacep.com.br/ws/'

  constructor(private http: HttpClient,
    private snackBar: MatSnackBar) { }


  get(id:string): Observable<any>{
      const url = `${this.baseUrl}/${id}/json`
      return this.http.get<any>(url)
    }

}
