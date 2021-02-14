import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    // Error handling is important and needs to be loaded first.
    // Because of this we should manually inject the services with Injector.
    constructor(private injector: Injector, private http: HttpClient, private authService: AuthService) { }

    handleError(error: Error | HttpErrorResponse): void {
        if (error instanceof HttpErrorResponse) {
            return this.handleHttpResponseError(error);
        }
    }

    private handleHttpResponseError(error: HttpErrorResponse): void {
      if (typeof error.error !== 'undefined' && error.error && typeof error.error.message !== 'undefined') {
        alert(error.error.message);
      } else {
        alert('Undefined error');
      }
    }
}
