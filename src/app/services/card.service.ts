import { Injectable } from '@angular/core';

import { Card } from '../model/Card';
import { Response } from '../model/Response';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  token = window.localStorage.getItem('token');
  head_obj = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);

  baseApiUrl = environment.baseApiUrl;
  apiUrl = `${this.baseApiUrl}/card`;

  constructor(private http: HttpClient) {}

  addMmeber(idCard: any, dados: any){
    const url = `${this.apiUrl}/member/${idCard}`;
    return this.http.patch(url, dados, { headers: this.head_obj})
  }

  deleteMember(idCard: any, idMember: any){
    const url = `${this.apiUrl}/member/${idCard}/${idMember}`;
    return this.http.patch(url, idCard, { headers: this.head_obj})
  }

  getCard(): Observable<Response<Card[]>> {
    return this.http.get<Response<Card[]>>(this.apiUrl, {
      headers: this.head_obj,
    });
  }

  findProducts(id: string): Observable<Response<any>> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Response<any>>(url, { headers: this.head_obj });
  }

  createCard(dados: Card): Observable<Card> {
    return this.http.post<Card>(this.apiUrl, dados, { headers: this.head_obj });
  }
  pushDataCard(id: string, dados: Card): Observable<Card> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.post<Card>(url, dados, { headers: this.head_obj });
  }

  editCard(id: string, dados: Card): Observable<Card> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.patch<Card>(url, dados, { headers: this.head_obj });
  }

  removeCard(id: any) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url, { headers: this.head_obj });
  }

  addCommentService(id: any, dados: any) {
    const url = `${this.apiUrl}/comment/${id}`;
    return this.http.patch(url, dados, { headers: this.head_obj });
  }

  deleteComeentService(idCard: any, idComment: any) {
    const url = `${this.apiUrl}/comment/${idCard}/${idComment}`;
    return this.http.patch(url, idCard, { headers: this.head_obj });
  }

  editCommentService(idCard: any, idComment: any, dados: any) {
    const url = `${this.apiUrl}/editComment/${idCard}/${idComment}`;
    return this.http.patch(url, dados, { headers: this.head_obj });
  }
}
