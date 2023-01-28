import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['../sign-up/sign-up.component.css']
})
export class SignInComponent {
  email?: any;
  password?: any;

  constructor(private authentification: LoginService, private router: Router) { }

  login() {
    this.authentification.login(this.email, this.password).subscribe((res: HttpResponse<any>) => {
      this.router.navigate([`/${res.body.identification}`]);
    })
  }
}
