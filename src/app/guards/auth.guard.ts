import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {map, Observable} from 'rxjs';
import {SecurityService} from "../services/security/security.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private securityService: SecurityService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.securityService.isLoggedIn().pipe(
      map(isLoggedIn => {
        if(isLoggedIn) {
          return true;
        } else {
          this.router.navigate(['/auth'])
          return false;
        }
      })
    )
  }

}
