import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  private baseUrl = 'http://localhost:8080/server';

  constructor(private http: HttpClient,) { }

  getServer(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  createServer(Server: Object): Observable<Object> {
    
    
    return this.http.post(`${this.baseUrl}`, Server).pipe(
      catchError(this.handleError)
    );;
  }

  updateServer(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value).pipe(
      catchError(this.handleError)
    );
  }

  deleteServer(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' }).pipe(
      catchError(this.handleError)
    );
  }

  getServerList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error,error.status);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => error);
  }
}
