import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }
  setloginUser(id: number): void{
    localStorage.setItem('id',id.toString());
  }
  getLoginUser(): string | null{
    return localStorage.getItem('id');
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

