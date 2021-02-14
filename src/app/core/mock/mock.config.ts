import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auth } from '../models/auth';

// import * as data from '../../assets/mock-data/countries.json';
// import {Country} from '../model/country';

// let countries: any[] = (data as any).default;
// const getCountries = (request: HttpRequest<any>) => {
//   return of(new HttpResponse({
//     status: 200, body: countries
//   }));
// };
// const getCountry = (request: HttpRequest<any>) => {
//   const id = extractIdPathParamFromUrl(request);
//   const country = countries.find(c => c.id === id);
//   return of(new HttpResponse({
//     status: 200, body: country
//   }));
// };
// const extractIdPathParamFromUrl = (request: HttpRequest<any>) => {
//   const requestUrl = new URL(request.url);
//   return requestUrl.pathname.split('/').pop();
// };


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
