import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {catchError, lastValueFrom, map, Observable, of, Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {User} from "../../models/user.model";
import {UserService} from "../user/user.service";
import {Router} from "@angular/router";
import {AuthTokens} from "../../interfaces/authTokens";

@Injectable({
  providedIn: "root"
})
export class SecurityService {
  currentUser?: User;
  apiUrl: string;
  constructor(private http: HttpClient, private userService: UserService, private router: Router) {
    this.apiUrl = environment.apiURL
  }
  login(user: User): Subscription {
    return this.http.post<AuthTokens>(`${this.apiUrl}/login`, user)
      .subscribe(
        (data: { accessToken: string; user: User; }) => {
          if(!data.user.id) {
            throw new Error('no user id')
          }
          this.setJwt(data.accessToken);
          this.setLocalUser(data.user);
          this.router.navigate(['/']);


        }
      );
  }

  isLoggedIn(): Observable<boolean>   {

    let jwt: string | null = this.getJwt()
    if(!jwt) {
      return of(false);
    }
    const localUser: User | undefined = this.getLocalUser();
    if(!localUser) {
      return of(false);
    }
    if(!localUser.id) {
      return of(false);
    }

    return this.userService.get(localUser.id).pipe(
      map(user => !!user),
      catchError(() => of(false))
    )
  }
  register(user: User): Observable<AuthTokens> {
    return this.http.post<AuthTokens>(`${this.apiUrl}/register`, user);
  }

  setJwt(jwt: string): void {
    localStorage.setItem('jwt', jwt);
  }
  removeJwt(): void {
    localStorage.removeItem('jwt');
  }
  getJwt(): string | null  {
    return localStorage.getItem('jwt');
  }

  getLocalUser(): User | undefined {
    const userString: string | null = localStorage.getItem('user');
    if(!userString) {
      return undefined
    }
    return JSON.parse(userString);
  }
  setLocalUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }
  removeLocalUser(): void {
    localStorage.removeItem('user');
  }
  logout() {
    this.removeJwt();
    this.removeLocalUser();
    this.router.navigate(['/auth']);
  }
}
