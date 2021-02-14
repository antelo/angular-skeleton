import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { distinctUntilChanged, map, tap } from 'rxjs/operators';
import { Auth } from '../models/auth';
import { User } from '../models/user';
import { ApiService } from './api.service';

interface LoginContextInterface {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly accessTokenStorageKey = 'jwtAccessToken';
  private readonly refreshTokenStorageKey = 'jwtRefreshToken';
  private readonly userStorageKey = 'jwtRefreshToken';
  private refreshingToken = false;
  public refreshedToken = new Subject<string>();

  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());
  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    private apiService: ApiService
  ) { }

  init(): void {
    const accessToken = this.getAccessToken();
    const user = this.getLocalStorageUser();
    if (accessToken && user) {
      this.currentUserSubject.next(user);
      this.isAuthenticatedSubject.next(true);
    } else {
      // Remove any potential remnants of previous auth states
      this.logout();
    }
  }

  getAccessToken(): string {
    return localStorage.getItem(this.accessTokenStorageKey) || '';
  }
  getRefreshToken(): string {
    return localStorage.getItem(this.refreshTokenStorageKey) || '';
  }

  getLocalStorageUser(): User | null {
    const user = localStorage.getItem(this.userStorageKey) || '';
    if (!user) {
      return null;
    }
    return JSON.parse(user) as User;
  }

  saveAuth(auth: Auth): void {
    localStorage.setItem(this.accessTokenStorageKey, auth.access_token);
    localStorage.setItem(this.refreshTokenStorageKey, auth.refresh_token);
    localStorage.setItem(this.userStorageKey, JSON.stringify(auth.user));
  }

  destroy(): void {
    localStorage.clear();
  }

  refreshToken(): Subject<string> {
    if (!this.refreshingToken) {
      this.refreshingToken = true;
      const headers = new HttpHeaders({'Skip-Authorization': 'true'});
      this.apiService.post('auth/refresh', { refresh_token: this.getRefreshToken()}, headers)
        .subscribe((response: Auth) => {
          this.setAuth(response);
          this.refreshedToken.next(response.access_token);
          this.refreshingToken = false;
      });
    }
    return this.refreshedToken;
  }

  setAuth(auth: Auth): void {
    this.saveAuth(auth);
    this.currentUserSubject.next(auth.user);
    this.isAuthenticatedSubject.next(true);
  }

  logout(): void {
    this.destroy();
    this.currentUserSubject.next({} as User);
    this.isAuthenticatedSubject.next(false);
  }

  login(loginContext: LoginContextInterface): Observable<User> {
    const headers = new HttpHeaders({'Skip-Authorization': 'true'});
    return this.apiService.post('auth/login', loginContext, headers)
      .pipe(
        tap((response: Auth) => this.setAuth(response)),
        map((response: Auth) => response.user)
      );
  }

}
