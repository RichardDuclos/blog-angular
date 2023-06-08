import {Component, OnDestroy} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {User} from "../../../models/user.model";
import {catchError, Observable, Subscription, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {SecurityService} from "../../../services/security/security.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnDestroy{
  hide: boolean = true;
  subscription?: Subscription;
  userForm = this.fb.group({
    email: [''],
    username: [''],
    password: [''],
  })

  constructor(private fb : FormBuilder, private securityService: SecurityService, private router: Router) {
  }

  ngOnDestroy(): void {
        if(this.subscription) {
          this.subscription.unsubscribe();
        }
    }

  onSubmit() {
    if(!this.userForm.valid) {
      return;
    }
    if(!this.userForm.value.email || !this.userForm.value.password || !this.userForm.value.username) {
      return;
    }
    const user : User  = {
      email: this.userForm.value.email,
      username: this.userForm.value.username,
      password: this.userForm.value.password
    }
    this.subscription = this.securityService.register(user)
      .pipe(
        catchError(err => {
          return throwError(err);
        })
      )
      .subscribe(
      (data: { accessToken: string; user: User; }) => {
        this.userForm.reset();
        this.router.navigate(['/login']);
      }
    )
  }
}
