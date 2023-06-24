import {Component, OnDestroy, OnInit} from '@angular/core';
import {ArticleService} from "./services/article/article.service";
import {SecurityService} from "./services/security/security.service";
import {Subscription} from "rxjs";
import {User} from "./models/user.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(protected securityService: SecurityService) {}
  title = 'blog-projet';
  user?: User;
  connected: boolean = false;
  connectionStateSubscription?: Subscription;
  loggedInSubscription?: Subscription;
  ngOnInit() {
    this.connectionStateSubscription = this.securityService.connectionMessage.subscribe((connectionState: boolean) => this.handleConnectionChange(connectionState))
    this.loggedInSubscription = this.securityService.isLoggedIn().subscribe((isLoggedIn: boolean) => {
      this.connected = isLoggedIn
      this.handleConnectionChange(this.connected)
    })
  }
  handleConnectionChange(connectionState: boolean) {
    this.connected = connectionState
    if(connectionState) {
      const user = this.securityService.getLocalUser();
      if(user) {
        this.user = user;
      }
    } else {
      this.user = undefined;
    }
  }

  logout() {

    this.securityService.logout();
  }

  ngOnDestroy(): void {
    if(this.connectionStateSubscription) {
      this.connectionStateSubscription.unsubscribe();
    }
    if(this.loggedInSubscription) {
      this.loggedInSubscription.unsubscribe();
    }
  }
}
