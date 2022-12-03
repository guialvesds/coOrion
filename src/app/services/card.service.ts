import { Injectable } from '@angular/core';

import { Card } from '../model/Card';
import { Response } from '../model/Response';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CardService {

  token = window.localStorage.getItem("token");
  head_obj = new HttpHeaders().set("Authorization", "Bearer "+ this.token)
 
  baseApiUrl = environment.baseApiUrl;
  apiUrl = `${this.baseApiUrl}/card`

  constructor(private http: HttpClient) { }

  getCard(): Observable<Response<Card[]>>{
    
    return this.http.get<Response<Card[]>>(this.apiUrl, {headers: this.head_obj});
    
  }

  getP(id: string): Observable<Response<Card>>{
    
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Response<Card>>(url, {headers: this.head_obj});
  }

  createCard(dados: Card ): Observable<Card>{   
      return this.http.post<Card>(this.apiUrl, dados, {headers: this.head_obj})
  }
  pushDataCard(id: string, dados: Card): Observable<Card>{
    const url = `${this.apiUrl}/${id}`
    return this.http.post<Card>(url, dados, {headers: this.head_obj})
}

  editCard(id: string, dados: Card): Observable<Card>{
    const url = `${this.apiUrl}/${id}`;
    return this.http.patch<Card>(url, dados, {headers: this.head_obj});    
  }

  removeCard(id: any){
    const url = `${this.apiUrl}/${id}`
    return this.http.delete(url, {headers: this.head_obj});
  }

}
