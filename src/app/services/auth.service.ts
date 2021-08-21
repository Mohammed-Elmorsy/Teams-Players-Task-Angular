import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  register(user: User) {
    return this.http.post<User>(`${environment.baseURL}/user/register`, user);
  }

  login(user: User) {
    return this.http.post<User>(`${environment.baseURL}/user/login`, user);
  }

  //JWT Token
  isLoggedIn(){     
    const token = localStorage.getItem('token');
    return !!token;
  }

  getAccessToken(){
    return localStorage.getItem('token');
  }

  getUserPayLoad(){
    let token = this.getAccessToken();
    if (token) {
        let userPayload = atob(token.split('.')[1]);
        // console.log(userPayload);
        return JSON.parse(userPayload);
    }
    else {
      return "null";
    }
  } 

  // validate token from server
  validateToken() {
    return this.http.get(`${environment.baseURL}/user/validateToken`);
  }

  logout(){
    console.log('this.getUserPayLoad().id', this.getUserPayLoad().id);
    return this.http.get(`${environment.baseURL}/user/logout/${this.getUserPayLoad().id}`);
  }
}
