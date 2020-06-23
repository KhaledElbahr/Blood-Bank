import { Donor } from './../models/donor';
import { Injectable } from '@angular/core';
import { of, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/shared/modules/auth/services/auth.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DonorService {
  url = 'http://localhost:8000/api/donor';
  ACCESS_TOKEN: string = this.auth.ACCESS_TOKEN;
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.ACCESS_TOKEN}`
  });

  constructor(
    private http: HttpClient,
    private auth: AuthService) { }

  getDonor(Id: number): Observable<Donor> {
    if (Id === 0) {
      return of(this.initializeDonor());
    }
    return this.http.get<Donor>(`${this.url}/${Id}`, { headers: this.headers }).pipe(
      map((data: Donor) => {
        console.log(data);
        return data;
      }),
      catchError(this.handleError)
    );
  }

  getDonorBySSN(ssn: string): Observable<Donor> {
    return this.http.get<Donor>(`http://localhost:8000/api/find_donor`, {
      headers: this.headers,
      params: { ssn }
    }).pipe(
      map((data: Donor) => {
        console.log(data);
        return data;
      }),
      catchError(this.handleError)
    );
  }

  addDonor(donor: Donor) {
    delete donor.id;
    return this.http.post<Donor>(`${this.url}`, donor, { headers: this.headers }).pipe(
      map((data: Donor) => {
        console.log(data);
        return data;
      }),
      catchError(this.handleError)
    );
  }

  updateDonor(donor: Donor): Observable<Donor> {
    return this.http.put<Donor>(`${this.url}/${donor.id}`, null,
      {
        headers: this.headers,
        params: {
          first_name: donor.first_name,
          last_name: donor.last_name,
          gender: `${donor.gender}`,
          blood_groug_id: `${donor.blood_group_id}`,
          ssn: donor.ssn,
          phone: donor.phone,
          email: donor.email,
        }
      }).pipe(
        map((data: any) => {
          console.log(data);
          return data;
        }),
        catchError(this.handleError)
      );
  }

  deleteDonor(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`, { headers: this.headers }).pipe(
      map((data: any) => {
        return data;
      }),
      catchError(this.handleError)
    );
  }

  private initializeDonor(): Donor {
    return {
      id: 0,
      first_name: null,
      last_name: null,
      full_name: null,
      gender: null,
      phone: null,
      email: null,
      ssn: null,
      blood_group_id: null,
      // address: null
    };
  }

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
