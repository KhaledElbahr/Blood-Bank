import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  // getUsers(): Observable<User[]> {
  //   return this.http.get<User[]>(`${this.url}`, { headers: this.headers }).pipe(
  //     map((data: User[]) => {
  //       console.log(data);
  //       return data;
  //     }),
  //     catchError(this.handleError)
  //   );
  // }

  // getUser(id: number) {
  //   return of(this.initializeUser());
  // }

  // addUser(user: User): Observable<any> {
  //   return of('Not Implemented Yet!!!');

  //   // user.id = null;
  //   // return this.http.post<any>(`${this.url}`, { headers: this.headers }).pipe(
  //   //   map((data: User) => {
  //   //     console.log(data);
  //   //     return data;
  //   //   }),
  //   //   catchError(this.handleError)
  //   // );
  // }

  // updateUser(user: User): Observable<any> {
  //   return of('Not Implemented Yet!!!');
  //   // return this.http.put<any>(`${this.url}?id=${user.id}`, user);
  // }

  // deleteUser(uid: number): Observable<any> {
  //   return of('Not Implemented Yet!!!');
  //   // return this.http.delete<any>(`${this.url}?id=${uid}`).pipe(
  //   //   map((data: any) => {
  //   //     return data;
  //   //   }),
  //   //   catchError(this.handleError)
  //   // );
  // }


  // private initializeUser(): User {
  //   return {
  //     id: 0,
  //     first_name: null,
  //     last_name: null,
  //     gender: { id: null, value: null },
  //     user_type: { id: null, value: null },
  //     phone: null,
  //     email: null,
  //     user_name: null,
  //     password: null
  //   };
  // }
}
