import { Injectable } from '@angular/core';
import { DonorActivity } from '../models/donor-activity';
import { throwError, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/shared/modules/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DonorActivityService {
  url = 'http://localhost:8000/api/donor_activity';
  ACCESS_TOKEN: string = this.auth.ACCESS_TOKEN;
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.ACCESS_TOKEN}`
  });
  constructor(
    private http: HttpClient,
    private auth: AuthService) { }

  getActivities(): Observable<DonorActivity[]> {
    return this.http.get<DonorActivity[]>(`${this.url}`, { headers: this.headers }).pipe(
      map((data: DonorActivity[]) => {
        console.log(data);
        return data;
      }),
      catchError(this.handleError)
    );
  }

  getActivity(id: number): Observable<DonorActivity> {
    if (id === 0) {
      return of(this.initializeActivity());
    }
    return this.http.get<DonorActivity>(`${this.url}/${id}`, { headers: this.headers }).pipe(
      map((data: DonorActivity) => {
        console.log(data);
        return data;
      }),
      catchError(this.handleError)
    );
  }

  addActivity(actvity: DonorActivity): Observable<any> {
    if (actvity.id === 0) {
      delete actvity.id;
    }
    console.log(actvity);
    return this.http.post(`${this.url}`, actvity, { headers: this.headers }).pipe(
      map((data) => {
        console.log(data);
        return data;
      }),
      catchError(this.handleError)
    );
  }

  updateActivity(actvity: DonorActivity) {
    console.log(actvity);
    return this.http.put(`${this.url}/${actvity.id}`, actvity, { headers: this.headers }).pipe(
      map((data) => {
        console.log(data);
        return data;
      }),
      catchError(this.handleError)
    );
  }

  deleteActivity(id: number) {
    return this.http.delete(`${this.url}/${id}`).pipe(
      map((data: any) => {
        return data;
      }),
      catchError(this.handleError)
    );
  }

  // Initialize Activity
  private initializeActivity(): DonorActivity {
    return {
      id: 0,
      donor_id: 0,
      full_name: null,
      product_type: { id: 0, value: null },
      viruses: null,
      temp: null,
      weight: null,
      height: null,
      status: { id: 0, value: null },
      comments: null,
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
