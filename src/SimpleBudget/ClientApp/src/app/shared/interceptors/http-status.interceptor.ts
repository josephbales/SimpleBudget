import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse
} from '@angular/common/http';

import { Observable, tap } from 'rxjs';

@Injectable()
export class HttpStatusInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(
        {
          next: (event) => (this.responseStatusHandler(event)),
          error: (error) => (console.error('intercept', error))
        })
    );
  }

  responseStatusHandler(event: HttpEvent<any>): void
  {
    if (event instanceof HttpResponse) {
      switch (event.status) {
        case 401:
          console.error('Unauthorized');
          break;
        case 403:
          console.error('Forbidden');
          break;
        default:
          break;
      }
    }
  }
}
