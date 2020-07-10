import { Request } from './../../../core/models/request';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/shared/modules/auth/services/auth.service';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  url = 'http://localhost:8000/api/handled_request';
  ACCESS_TOKEN: string = this.auth.ACCESS_TOKEN;
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.ACCESS_TOKEN}`
  });

  constructor(
    private http: HttpClient,
    private auth: AuthService) { }

  getRequests(): Observable<Request[]> {
    return this.http.get<Request[]>(`http://localhost:8000/api/request`, { headers: this.headers }).pipe(
      map((data: Request[]) => {
        console.log(data);
        return data;
      }),
      catchError(this.handleError)
    );
  }

  getApprovedRequests(): Observable<Request[]> {
    return this.http.get<Request[]>(`${this.url}`, { headers: this.headers }).pipe(
      map((data: Request[]) => {
        console.log(data);
        return data;
      }),
      catchError(this.handleError)
    );
  }

  confirmRequest(handleRequest) {
    return this.http.post(`${this.url}`, handleRequest, { headers: this.headers }).pipe(
      map((data) => {
        console.log(data);
        return data;
      }),
      catchError(this.handleError)
    );
  }

  deleteHandledRequest(id: number) {
    return this.http.delete(`${this.url}/${id}`, { headers: this.headers }).pipe(
      map((data: any) => {
        return data;
      }),
      catchError(this.handleError)
    );
  }

  // Error Handler
  private handleError(err) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned an unsuccessful response!!! ${err.status} - ${err.body.error}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
