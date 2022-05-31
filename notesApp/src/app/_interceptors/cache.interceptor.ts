import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, of, } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CacheResolverService } from '../_services/cache-resolver.service';

const TIME_TO_LIVE = 60;

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

  constructor(private cacheService: CacheResolverService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if(request.method !== 'GET') {
      return next.handle(request);
    }

    const cacheResponse = this.cacheService.get(request.urlWithParams);
    return cacheResponse ? of(cacheResponse) : this.sendRequest(request, next);
  }

  sendRequest(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap((event) => {
        if(event instanceof HttpResponse){
          this.cacheService.set(request.urlWithParams, event, TIME_TO_LIVE)
        }
      })
    );
  }
}
