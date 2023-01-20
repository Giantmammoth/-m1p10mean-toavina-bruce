import { Injectable } from '@angular/core';
import { WebRequestService } from 'src/app/web-request.service';
import { SignIn } from './signIn';
import { SignUp } from './signUp';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private loginRequest: WebRequestService) { }

}
