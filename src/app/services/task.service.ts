import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response } from '../model/Response';
import { Task } from '../model/tasks';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  token = window.localStorage.getItem('token');
  head_obj = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);

  baseApiUrl = environment.baseApiUrl;
  apiUrl = `${this.baseApiUrl}/lists`;

  constructor(
    private http: HttpClient,

  ) { }

  createListService(idCard: any, dados: Object){
    const url = `${this.apiUrl}/${idCard}`;
    return this.http.post(url, dados, {headers: this.head_obj});
  };
  
  getListService(idCard: any): Observable<Response<Task>>{
    const url = `${this.apiUrl}/${idCard}/lists`;
    return this.http.get<Response<Task>>(url, {headers: this.head_obj});
  };

  editListService(_id: string, dados: Object){
    const url = `${this.apiUrl}/${_id}`;
    return this.http.patch(url, dados, {headers: this.head_obj});
  };

  deleteListService(_id: string){
    const url = `${this.apiUrl}/${_id}`;
    return this.http.delete(url);
  }


  // Tasks

  getTasksService(listId: string){
    const url = `${this.apiUrl}/${listId}/tasks`;
    return this.http.get(url, {headers: this.head_obj})
  }

}
