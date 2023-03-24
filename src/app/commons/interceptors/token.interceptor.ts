import { Injectable, Injector, inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  private injector = inject(Injector)
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authservice = this.injector.get(AuthService);
    let tokenReq = req.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${authservice.getToken()}`
      }
    });
    return next.handle(tokenReq);
  }

}