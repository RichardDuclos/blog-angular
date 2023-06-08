import { Component } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  loginForm: boolean = true;

  toggleForm() {
    this.loginForm = !this.loginForm;
  }
}
