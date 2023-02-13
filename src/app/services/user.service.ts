import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable, map, catchError, Observer, observable } from "rxjs";



import { environment } from "src/environments/environment";
import { Response } from "../model/Response";
import { User } from "../model/User";
import jwtDecode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseAPiUrl: string = environment.baseApiUrl;
  private apiUrl = `${this.baseAPiUrl}/user`;

  private token = window.localStorage.getItem('token');
  private head_obj = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);

  usuarios: User[] = [];

  constructor(private http: HttpClient) { }

  findUsers(): Observable<Response<User[]>> {
    return this.http.get<Response<User[]>>(this.apiUrl);
  }

  getUserId(id: any): Observable<Response<User[]>>{
    return this.http.get<Response<User[]>>(`${this.apiUrl}/${id}`)
  }
  
  login( dados: FormData){  
    return this.http.post<any>(`${this.baseAPiUrl}/auth`, dados, {observe: 'response'});  
 }

  creatUser(dados: FormData) {
    return this.http.post<any>(`${this.apiUrl}/`, dados).subscribe((item) => {
        // if(item && item.token){
        //   window.localStorage.removeItem("token");
        //   window.localStorage.setItem("token", item.token);
        //   return true
        // }
        // return false;
    });
  }

  uploadAvatarService(userId: string, fileName: string, dados: FormData){
    const url = `${this.apiUrl}/upload/${userId}/${fileName}`
    return this.http.post(url, dados, {headers: this.head_obj});
  }

  getToken(){
    return this.http.get<any>(this.apiUrl).subscribe((item) =>{
     item.token; 
    });
  }


  getauthToken() {
    const token = window.localStorage.getItem("token");
    return token;
  }

  getTokenExpiration(token: string) {
    const decoded: any = jwtDecode(token);

    if (decoded.exp === undefined) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) {
      return true;
    }

    const date = this.getTokenExpiration(token);
    if (date === undefined) {
      return false;
    }

    return !(date!.valueOf() > new Date().valueOf());
  }

  isUserLoggedIn() {
    const token = this.getauthToken();
    if (!token) {
      return false;
    } else if (this.isTokenExpired(token)) {
      return false;
    }
    return true;
  }
}
