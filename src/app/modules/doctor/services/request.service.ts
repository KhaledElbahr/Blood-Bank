import { Injectable } from '@angular/core';
import { of, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/shared/modules/auth/services/auth.service';
import { map, catchError } from 'rxjs/operators';
import { Request } from './../../../core/models/request';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  url = 'http://localhost:8000/api/request';
  ACCESS_TOKEN: string = this.auth.ACCESS_TOKEN;
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
    delete request.id;
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
    return this.http.put(`${this.url}/${request.id}`, null,
      {
        headers: this.headers,
        params: {
          patient_id: `${request.patient_id}`,
          blood_group_id: `${request.blood_group_id}`,
          product_type_id: `${request.product_type_id}`,
          quantity: `${request.quantity}`,
          priority: `${request.priority}`,
          required_date: `${request.required_date}`
        }
      }).pipe(
        map((data) => {
          console.log(data);
          return data;
        }),
        catchError(this.handleError)
      );
  }

  deleteRequest(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`, { headers: this.headers }).pipe(
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
      product_type_id: null,
      blood_group_id: null,
      blood_group: null,
      product_type: null,
      quantity: 0,
      priority: null,
      patient_id: 0,
      full_name: null,
      required_date: null,
      status: null,
      submitted_by: null,
      created_at: null
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
