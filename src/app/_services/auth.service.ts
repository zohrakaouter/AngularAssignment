import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';



const AUTH_API = '/api/v2/auth/';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string){
   
    return this.http.post(AUTH_API+'login',{username,password},{headers: new HttpHeaders()
      .set('Content-Type', 'application/json'),observe: 'response' });
      
      
  }


}