import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/shared/modules/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  url = 'http://localhost:8000/api/request';
  ACCESS_TOKEN: string = this.auth.ACCESS_TOKEN;
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.ACCESS_TOKEN}`
  });

  constructor(
    private http: HttpClient,
    private auth: AuthService) { }

  getRequests() {}

  getApprovedRequests() {}

  confirmRequest() {}

  deleteRequest(id: number) {}
}
