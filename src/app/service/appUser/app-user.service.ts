import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppUserService {
  private baseUrl = 'http://localhost:8080/appUser';

  constructor(private http: HttpClient) { }

  getAppUser(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createAppUser(id: number, AppUser: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, AppUser);
  }

  updateAppUser(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteAppUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getAppUserList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}