import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackupListService {
  constructor(private http: HttpClient,) { }
  private server = 'http://localhost:8080';
  private downloadUrl= 'http://localhost:8080/download1';
  private baseUrl = 'http://localhost:8080/listfolders';
  private fileUrl='http://localhost:8080/listfiles'
  getDriveBackupFolderList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
  getDriveBackupFileList(id:String): Observable<any> {
    return this.http.get(`${this.fileUrl}/${id}`);
  }

  downloadFile(id: String): Observable<any>{
    return this.http.get(`${this.downloadUrl}/${id}`, {
      
      observe: 'response',
      responseType: 'blob'
    });
  }
  upload(formData: FormData): Observable<HttpEvent<string[]>> {
    return this.http.post<string[]>(`${this.server}/upload`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

}
