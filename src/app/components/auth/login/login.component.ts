import { Component } from '@angular/core';
import {User} from "../../../models/user.model";
import {catchError, Subscription, throwError} from "rxjs";
import {SecurityService} from "../../../services/security/security.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide: boolean = true;
  subscription?: Subscription;

  user: User = {
    email: '',
    password: '',
  }

  constructor(private securityService: SecurityService) {
  }

  onSubmit() {
    this.securityService.login(this.user)
  }
}
