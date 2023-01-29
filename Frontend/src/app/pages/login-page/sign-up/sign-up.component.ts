import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { WebRequestService } from 'src/app/services/webRequest/web-request.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  fullname: any;
  email: any;
  password: any;
  confirm_password: any;

  constructor(private signupService: LoginService) { }

  signup() {
    console.log("Clicked")
    this.signupService.signup(this.fullname, this.email, this.password);
  }

}
