import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = 'http://localhost:8080/admin';
  private loginUrl = 'http://localhost:8080/loginadmin';

  constructor(private http: HttpClient,private auth: AuthService) { }

  getAdmin(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createAdmin(Admin: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, Admin);
  }

  updateAdmin(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteAdmin(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getAdminList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  login(Admin: Object): Observable<any> {
    this.auth.setToken("Admin");
    return this.http.post(`${this.loginUrl}`, Admin);
  }
}
