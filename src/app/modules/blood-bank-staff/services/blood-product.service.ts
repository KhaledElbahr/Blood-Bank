import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/shared/modules/auth/services/auth.service';
import { Observable, throwError, of } from 'rxjs';
import { BloodProduct } from '../models/blood-product';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BloodProductService {
  url = 'http://localhost:8000/api/blood_product';
  ACCESS_TOKEN: string = this.auth.ACCESS_TOKEN;
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.ACCESS_TOKEN}`
  });
  constructor(
    private http: HttpClient,
    private auth: AuthService) { }

  getProducts(): Observable<BloodProduct[]> {
    return this.http.get<BloodProduct[]>(`${this.url}`, { headers: this.headers }).pipe(
      map((data: BloodProduct[]) => {
        console.log(data);
        return data;
      }),
      catchError(this.handleError)
    );
  }

  getProduct(Id: number): Observable<BloodProduct> {
    if (Id === 0) {
      return of(this.initializeProduct());
    }
    return this.http.get<BloodProduct>(`${this.url}/${Id}`, { headers: this.headers }).pipe(
      map((data: BloodProduct) => {
        console.log(data);
        return data;
      }),
      catchError(this.handleError)
    );
  }

  getProductByBarcode(barcode: string): Observable<BloodProduct> {
    return this.http.get<BloodProduct>('http://127.0.0.1:8000/api/find_product', {
      headers: this.headers,
      params: { barcode }
    }).pipe(
      map((data: BloodProduct) => {
        console.log(data);
        return data;
      }),
      catchError(this.handleError)
    );
  }

  addProduct(product: BloodProduct): Observable<any> {
    if (product.id === 0) {
      delete product.id;
    }
    console.log(product);
    return this.http.post(`${this.url}`, product, { headers: this.headers }).pipe(
      map((data) => {
        console.log(data);
        return data;
      }),
      catchError(this.handleError)
    );
  }

  updateProduct(product: BloodProduct) {
    console.log(product);
    return this.http.put(`${this.url}/${product.id}`, product, { headers: this.headers }).pipe(
      map((data) => {
        console.log(data);
        return data;
      }),
      catchError(this.handleError)
    );
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.url}/${id}`, { headers: this.headers }).pipe(
      map((data: any) => {
        return data;
      }),
      catchError(this.handleError)
    );
  }

  // Initialize Activity
  private initializeProduct(): BloodProduct {
    return {
      id: 0,
      barcode: null,
      product_type_id: null,
      product_type: null,
      storage_location_id: null,
      storage_location: null,
      blood_group_id: null,
      blood_group: null,
      donor_activity_id: null
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
