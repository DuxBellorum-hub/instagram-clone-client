import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl : string = 'http://localhost:8080/';

  constructor(private httpClient: HttpClient, private router : Router) { }

  register(user) : Observable<User>{
    return this.httpClient.post<User>(this.baseUrl+'users/add', user);
  }
   
  login(user) : Observable<User>{
 
    return this.httpClient.post<User>(this.baseUrl+'login', user);
  }
  logout() : void{
    localStorage.removeItem("token");
    this.router.navigate(["/auth"]);
  }



}
