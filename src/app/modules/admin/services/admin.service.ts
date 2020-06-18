import { AuthService } from './../../../shared/modules/auth/services/auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from 'src/app/core/models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  url = 'http://localhost:8000/api/staff';
  ACCESS_TOKEN: string = this.auth.ACCESS_TOKEN;
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.ACCESS_TOKEN}`
  });

  constructor(
    private http: HttpClient,
    private auth: AuthService) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}`, { headers: this.headers }).pipe(
      map((data: User[]) => {
        console.log(data);
        return data;
      }),
      catchError(this.handleError)
    );
  }
  // return of(this.initializeUser());
  getUser(id: number): Observable<User> {
    if (id === 0) {
      return of(this.initializeUser());
    }
    return this.http.get<User>(`${this.url}/${id}`, { headers: this.headers }).pipe(
      map((data: User) => {
        console.log(data);
        return data;
      }),
      catchError(this.handleError)
    );
  }

  addUser(user: User): Observable<User> {
    user.id = null;
    return this.http.post<User>(`${this.url}`, user, { headers: this.headers }).pipe(
      map((data: User) => {
        console.log(data);
        return data;
      }),
      catchError(this.handleError)
    );
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.url}/${user.id}`, null,
      {
        headers: this.headers,
        params: {
          first_name: user.first_name,
          last_name: user.last_name,
          gender: `${user.gender}`,
          phone: user.phone,
          email: user.email,
          user_type_id: `${user.user_id}`
        }
      }).pipe(
        map((data: any) => {
          console.log(data);
          return data;
        }),
        catchError(this.handleError)
      );
  }

  deleteUser(uid: number): Observable<any> {
    return of('Not Implemented Yet!!!');
    // return this.http.delete<any>(`${this.url}?id=${uid}`, { headers: this.headers }).pipe(
    //   map((data: any) => {
    //     return data;
    //   }),
    //   catchError(this.handleError)
    // );
  }

  private initializeUser(): User {
    return {
      id: 0,
      user_type: null,
      user_id: 0,
      first_name: null,
      last_name: null,
      full_name: null,
      gender: null,
      phone: null,
      email: null,
      user_name: null,
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
