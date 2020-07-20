import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/shared/modules/auth/services/auth.service';
import { of, throwError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Patient } from '../models/patient';


@Injectable({
  providedIn: 'root'
})
export class PatientService {
  url = 'http://127.0.0.1:8000/api/patient';
  ACCESS_TOKEN: string = this.auth.ACCESS_TOKEN;
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.ACCESS_TOKEN}`
  });

  constructor(private http: HttpClient, private auth: AuthService) { }

  getPatients(): Observable<Patient[]>{
    return this.http.get<Patient[]>(`${this.url}`, { headers: this.headers }).pipe(
      map((data: Patient[]) => {
        return data;
      }),
      catchError(this.handleError)
    );
  }

  getPatientById(Id: number): Observable<Patient>{
    if (Id === 0) {
      return of(this.initializePatient());
    }
    return this.http.get<Patient>(`${this.url}/${Id}`, { headers: this.headers }).pipe(
      map((data: Patient) => {
        console.log(data);
        return data;
      }),
      catchError(this.handleError)
    );
  }

  getPatientBySSN(ssn: string): Observable<Patient> {
    return this.http.get<Patient>('http://127.0.0.1:8000/api/find_patient', {
      headers: this.headers,
      params: { ssn }
    }).pipe(
      map((data: Patient) => {
        console.log(data);
        return data;
      })
    );
  }

  addPatient(patient: Patient): Observable<any> {
    // if (patient.id === 0) {
    delete patient.id;
    // }
    console.log(patient);
    return this.http.post(`${this.url}`, patient, { headers: this.headers }).pipe(
      map((data) => {
        console.log(data);
        return data;
      }),
      catchError(this.handleError)
    );
  }

  updatePatient(patient: Patient): Observable<any> {
    console.log(patient);
    return this.http.put(`${this.url}/${patient.id}`, patient, { headers: this.headers }).pipe(
      map((data) => {
        console.log(data);
        return data;
      }),
      catchError(this.handleError)
    );
  }

  deletePatient(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`, { headers: this.headers }).pipe(
      map((data: any) => {
        return data;
      }),
      catchError(this.handleError)
    );
  }

  // Initialize Patient
  private initializePatient(): Patient {
    return {
      id: 0,
      ssn: null,
      first_name: null,
      last_name: null,
      full_name: null,
      phone: null,
      gender: { id: null, value: null },
      blood_group_id: { id: null, value: null },
      blood_group: null,
      address: null,
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
