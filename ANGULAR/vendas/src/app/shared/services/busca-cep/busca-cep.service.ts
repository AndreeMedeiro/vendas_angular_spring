import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuscaCepService {

  private baseUrl = 'https://viacep.com.br/ws/'

  constructor(private http: HttpClient) { }


  get(id:string){
      const url = `${this.baseUrl}/${id}/json`
      return this.http.get<any>(url).pipe(delay(1000))
    }

}
