import { Injectable } from '@angular/core';
import { Request } from './../models/request';
import { of, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/shared/modules/auth/services/auth.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  url = 'http://localhost:8000/api/request';
  ACCESS_TOKEN: string = this.auth.ACCESS_TOKEN;
  USER_ID: number = this.auth.USER_ID;
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.ACCESS_TOKEN}`
  });
  constructor(
    private http: HttpClient,
    private auth: AuthService) { }

  getRequests(): Observable<Request[]> {
    return this.http.get<Request[]>(`${this.url}`, { headers: this.headers }).pipe(
      map((data: Request[]) => {
        console.log(data);
        return data;
      }),
      catchError(this.handleError)
    );
  }

  getRequest(id: number): Observable<Request> {
    if (id === 0) {
      return of(this.initializeRequest());
    }
    return this.http.get<Request>(`${this.url}/${id}`, { headers: this.headers }).pipe(
      map((data: Request) => {
        console.log(data);
        return data;
      }),
      catchError(this.handleError)
    );
  }

  addRequest(request: Request): Observable<any> {
    if (request.id === 0) {
      delete request.id;
    }
    console.log(request);
    return this.http.post(`${this.url}`, request, { headers: this.headers }).pipe(
      map((data) => {
        console.log(data);
        return data;
      }),
      catchError(this.handleError)
    );
  }

  updateRequest(request: Request) {
    console.log(request);
    return this.http.put(`${this.url}/${request.id}`, request, { headers: this.headers }).pipe(
      map((data) => {
        console.log(data);
        return data;
      }),
      catchError(this.handleError)
    );
  }

  deleteRequest(id: number) {
    return this.http.delete(`${this.url}/${id}`).pipe(
      map((data: any) => {
        return data;
      }),
      catchError(this.handleError)
    );
  }

  // Initialize Request
  private initializeRequest(): Request {
    return {
      id: 0,
      product_type: { id: 0, value: null },
      blood_group: { id: 0, value: null },
      quantity: 0,
      priority: { id: 0, value: null },
      patient_id: 0,
      patient_full_name: null,
      requested_date: null,
      required_date: null,
      status: { id: 0, value: null },
      submitted_by: null,
    };
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
