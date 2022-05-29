import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient,private router: Router) {}

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }
  setloginUser(id: number): void{
    localStorage.setItem('id',id.toString());
  }
  getLoginUser(): string | null{
    return localStorage.getItem('id');
  }
  
  confirmUserEmail(token: string) :Observable<Object>{
   return this.http.get('http://localhost:8080/api/v1/registration/confirm?token='+token)
  }
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }
  isLoggedInAsTeacher() {
    return this.getToken()=="Teacher";
  }
  isLoggedInAsStudent() {
    return this.getToken() == "Student";
  }
  isLoggedInAsAdmin() {
    return this.getToken() == "Admin";
  }


  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
  
}

