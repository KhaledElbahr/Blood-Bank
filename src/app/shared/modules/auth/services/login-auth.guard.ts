import { Injectable } from '@angular/core';
import { CanLoad, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginAuthGuard implements CanLoad{

  constructor(private authService: AuthService, private router: Router) { }

  canLoad(route: Route): boolean | Promise<boolean> | Observable<boolean> {
    const url: string = route.path;
    console.log('Url:' + url);

    return this.authService.isAuthenticated().then(
      (Authenticated: string) => {
        if (Authenticated === url) {
          return true;
        } else {
          this.router.navigate(['/']);
          return false;
        }
      }
    );
  }
}
