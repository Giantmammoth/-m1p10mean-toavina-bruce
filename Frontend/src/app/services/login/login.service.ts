import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { shareReplay, tap } from 'rxjs';
import { WebRequestService } from 'src/app/services/webRequest/web-request.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private webService: WebRequestService, private route: Router) { }

  login(email: string, password: string) {
    return this.webService.login(email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        this.setSession(res.body.data);
        console.log("Login SUCCESS");
      })
    )
  }

  logout() {
    localStorage.removeItem('x-auth-token');
    this.route.navigate(['/']);
  }

  getAccessToken() {
    return localStorage.getItem('x-auth-token');
  }

  setAccessToken(token: string) {
    localStorage.setItem('x-auth-token', token);
  }

  private setSession(authToken: any) {
    localStorage.setItem('x-auth-token', authToken);
  }

  getUser() {
    return this.webService.get("").pipe(

    );
  }

}
