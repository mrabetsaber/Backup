import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoriqueService {

  private baseUrl = 'http://localhost:8080/historique';

  constructor(private http: HttpClient,) { }

  gethistoriqueList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
