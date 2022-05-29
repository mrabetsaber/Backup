import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  private baseUrl = 'http://localhost:8080/server';

  constructor(private http: HttpClient,) { }

  getServer(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createServer(Server: Object): Observable<Object> {
    
    
    return this.http.post(`${this.baseUrl}`, Server);
  }

  updateServer(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteServer(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getServerList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  
}
