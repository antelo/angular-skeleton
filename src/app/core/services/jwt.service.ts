import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  private readonly accessTokenKey = 'jwtAccessToken';
  private readonly refreshTokenKey = 'jwtRefreshToken';
  private jwtHelper: JwtHelperService;

  constructor() {
    this.jwtHelper = new JwtHelperService();
  }

  getAccessToken(): string {
    return localStorage.getItem(this.accessTokenKey) || '';
  }
  getRefreshToken(): string {
    return localStorage.getItem(this.refreshTokenKey) || '';
  }

  saveTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(this.accessTokenKey, accessToken);
    localStorage.setItem(this.refreshTokenKey, refreshToken);
  }

  destroyTokens(): void {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
  }

  decodeToken(token: string): any {
    return this.jwtHelper.decodeToken(token);
  }
  getTokenExpirationDate(token: string): Date | null{
    return this.jwtHelper.getTokenExpirationDate(token);
  }
  isTokenExpired(token: string): boolean{
    return this.jwtHelper.isTokenExpired(token);
  }

}
