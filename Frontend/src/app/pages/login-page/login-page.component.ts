import { Component } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  login: string = "sign up"

  changeLoginPage(page_name: string): void {
    this.login = page_name;
  }
}
