import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {SecurityService} from "../services/security/security.service";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private securityService: SecurityService) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.securityService.getJwt();
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    })
    return next.handle(req);
  }
}
