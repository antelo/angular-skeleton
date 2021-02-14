import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { MockHandler } from './mock.config';

@Injectable()
export class HttpMockApiInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const handler = new MockHandler();
    const mockEndpointHandler = handler.selectHandler(request);
    return next.handle(mockEndpointHandler);
  }
}
