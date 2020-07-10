import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

interface AccessData {
  success: {
    token: string;
    user_type: string;
    user_type_id: number;
    id: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;
  userType: string;
  USER_ID: number;
  ACCESS_TOKEN: string;

  constructor(private http: HttpClient) { }

  isAuthenticated() {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.userType);
      }, 200);
    });
    return promise;
  }

  login(loginInfo): Observable<any> {
    return this.http.post('http://localhost:8000/api/login', loginInfo).pipe(
      map((data: AccessData) => {
        // const userType = data.success.user_type;
        const access = {
          user_type: data.success.user_type,
          user_type_id: data.success.user_type_id,
          id: data.success.id,
          token: data.success.token
        };
        this.ACCESS_TOKEN = access.token;
        this.USER_ID = access.id;
        console.log(data);
        if (access.user_type_id === 1) {
          this.userType = 'admin';
          localStorage.setItem('token', access.token);
        } else if (access.user_type_id === 2) {
          this.userType = 'blood-bank';
          localStorage.setItem('token', access.token);
        } else if (access.user_type_id === 3) {
          this.userType = 'hospital';
          localStorage.setItem('token', access.token);
        } else if (access.user_type_id === 4) {
          this.userType = 'doctor';
          localStorage.setItem('token', access.token);
        } else if (access.user_type_id === 5) {
          this.userType = 'donor';
          localStorage.setItem('token', access.token);
        }
        return access;
      }),
      catchError(err => of('Something went wrong'))
    );
  }

  logout() {
    this.loggedIn = false;
    localStorage.removeItem('token');
    this.isAuthenticated();
  }
}
