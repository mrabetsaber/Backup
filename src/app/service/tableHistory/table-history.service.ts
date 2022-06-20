import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableHistoryService {
  private readonly newProperty = 'http://localhost:8080/parametrageHistorique';

  private baseUrl = this.newProperty;

  constructor(private http: HttpClient) { }


  createParametrageHistorique(ParametrageHistorique: Object): Observable<Object> {
    
    return this.http.post(`${this.baseUrl}`, ParametrageHistorique);
  }

  updateParametrageHistorique(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteParametrageHistorique(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getParametrageHistoriqueList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
  getParametrageHistorique(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
}
