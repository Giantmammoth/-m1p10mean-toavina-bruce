import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebRequestService } from 'src/app/web-request.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private webService: WebRequestService) { }

  login(email: string, password: string) {

  }

}
