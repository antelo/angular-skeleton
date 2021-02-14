import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) {}

  private formatErrors(error: any): Observable<any> {
    return  throwError(error.error);
  }

  get(path: string, params: HttpParams = new HttpParams(), headers?: HttpHeaders): Observable<any> {
    return this.http.get(`${environment.api_url}${path}`, { params, headers })
      .pipe(catchError(this.formatErrors));
  }

  put(path: string, body: any, headers?: HttpHeaders): Observable<any> {
    return this.http.put(`${environment.api_url}${path}`, body, { headers })
      .pipe(catchError(this.formatErrors));
  }

  post(path: string, body: any, headers?: HttpHeaders): Observable<any> {
    return this.http.post(`${environment.api_url}${path}`, body, { headers })
      .pipe(catchError(this.formatErrors));
  }

  delete(path: string, headers?: HttpHeaders): Observable<any> {
    return this.http.delete(`${environment.api_url}${path}`, { headers })
      .pipe(catchError(this.formatErrors));
  }
}
