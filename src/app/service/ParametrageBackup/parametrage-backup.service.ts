import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ParametrageBackupService {
  private baseUrl = 'http://localhost:8080/backup';
  private addUrl='http://localhost:8080/servers'

constructor(private http: HttpClient,private auth: AuthService) { }

getBackup(id: number): Observable<any> {
  return this.http.get(`${this.baseUrl}/${id}`);
}

createBackup(id:number,Backup: Object): Observable<Object> {
  return this.http.post(`${this.addUrl}/${id}/backups`, Backup);
}

updateBackup(id: number, value: any): Observable<Object> {
  return this.http.put(`${this.baseUrl}/${id}`, value);
}

deleteBackup(id: number): Observable<any> {
  return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
}

getBackupList(): Observable<any> {
  return this.http.get(`${this.baseUrl}`);
}


}
