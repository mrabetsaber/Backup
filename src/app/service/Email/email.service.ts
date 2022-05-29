import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private baseUrl = 'http://localhost:8080/getAllEmail';

  constructor(private http: HttpClient,) { }

  getEmailList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
