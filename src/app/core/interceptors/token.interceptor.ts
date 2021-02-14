import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtService } from '../services/jwt.service';
import { AuthService } from '../services/auth.service';
import { switchMap, take } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private jwtService: JwtService,
    private authService: AuthService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.method !== 'OPTIONS' && !request.headers.get('Skip-Authorization')) {

      const token = this.authService.getAccessToken();
      if (token) {

        if (this.jwtService.isTokenExpired(token)) {
          return this.onTokenExpired(request, next);
        }

        request = request.clone({ setHeaders: {'Authorization': `Bearer ${token}`} });
      }
    }
    return next.handle(request);
  }

  private onTokenExpired(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.refreshToken().pipe(
      take(1),
      switchMap((refreshedToken: string) => {
      const newRequest = request.clone({ setHeaders: {'Authorization': `Bearer ${refreshedToken}`} });
      return next.handle(newRequest);
    }));
  }

}
