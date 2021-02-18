import { HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';


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
