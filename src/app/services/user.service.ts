import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  baseUrl : string = 'http://localhost:8080/';

  constructor( private httpClient: HttpClient) { }

  getUserIdWithToken(token){
    return this.httpClient.post(`${this.baseUrl}token`, token);
  }

  getUserById(id):Observable<User>{
    return this.httpClient.get<User>(`${this.baseUrl}users/${id}`);
  }

  updateUserProfil(user, id: number ):Observable<any>{
    return this.httpClient.put<any>(`${this.baseUrl}users/${id}/edit`, user);
  }

  updatePassword(password: object, id: number):Observable<any>{
    console.log(password)
    return this.httpClient.put<any>(`${this.baseUrl}users/${id}/edit/password`, password);

  }

  deleteUser(id: number, password : string):Observable<User>{
    let user = {"password": password};
    console.log(user);
    return this.httpClient.post<User>(`${this.baseUrl}users/${id}/delete`, user);
  }

  updateUserPhoto(formdata : FormData){
    let id = +formdata.get('idUser');
    return this.httpClient.put(`${this.baseUrl}users/${id}/edit/photo`, formdata);
  }

  getAllUsersWhoPublished(): Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.baseUrl}users/published`)
  }


}
