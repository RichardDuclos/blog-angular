import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {User} from "../../models/user.model";
import {catchError, map, Observable, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class UserService {
  apiRoute: string;
  constructor(private http: HttpClient) {
    this.apiRoute = environment.apiURL + '/users'
  }

  get(id: number): Observable<User> {
    let api = `${this.apiRoute}/${id}`;
    return this.http.get(api).pipe(
      map((res) => {
        return res || {}
      }),
      catchError(this.handleError)
    );
  }
  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
