import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/shared/modules/auth/services/auth.service';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HospitalStaffService {
  // url = 'http://localhost:8000/api/staff';
  // ACCESS_TOKEN: string = this.auth.ACCESS_TOKEN;
  // USER_ID: number = this.auth.USER_ID;
  // headers = new HttpHeaders({
  //   'Content-Type': 'application/json',
  //   Authorization: `Bearer ${this.ACCESS_TOKEN}`
  // });

  // constructor(
  //   private http: HttpClient,
  //   private auth: AuthService) { }

  // getHospitalStaff(): Observable<HospitalStaff> {
  //   return this.http.get<HospitalStaff>(`${this.url}/${this.USER_ID}`, { headers: this.headers }).pipe(
  //     map((data: HospitalStaff) => {
  //       console.log(data);
  //       return data;
  //     }),
  //     catchError(this.handleError)
  //   );
  // }

  // private handleError(err) {
  //   let errorMessage: string;
  //   if (err.error instanceof ErrorEvent) {
  //     errorMessage = `An error occurred: ${err.error.message}`;
  //   } else {
  //     errorMessage = `Backend returned an unsuccessful response!!! ${err.status} - ${err.body.error}`;
  //   }
  //   console.log(errorMessage);
  //   return throwError(errorMessage);
  // }
}
