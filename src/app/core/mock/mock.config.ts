import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auth } from '../models/auth';


export class MockHandler {

  selectHandler(request: HttpRequest<any>): HttpRequest<any> {
    const pathname = request.url.replace(environment.api_url, '');
    if (request.method === 'POST' && (pathname === 'auth/login' || pathname === 'auth/refresh')) {
      return this.postAuthMock(request);
    }
    return request;
  }

  private postAuthMock(request: HttpRequest<any>): HttpRequest<any> {
    return new HttpRequest('GET', 'assets/mock-data/auth.json');
  }

}
