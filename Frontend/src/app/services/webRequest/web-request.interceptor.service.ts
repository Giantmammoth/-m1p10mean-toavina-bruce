import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class WebRequestInterceptor implements HttpInterceptor {

  constructor(private authService: LoginService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    request = this.AddAuthentificationHeader(request);
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {

        if (error.status === 401) {
          this.authService.logout()
        }

        return throwError(error);
      })
    );
  }


  AddAuthentificationHeader(request: HttpRequest<any>) {
    const token = this.authService.getAccessToken();
    if (token) {
      return request.clone({ setHeaders: { "x-auth-token": token } });
    }
    return request;
  }

}
