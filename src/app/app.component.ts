import {Component, OnInit} from '@angular/core';
import {ArticleService} from "./services/article/article.service";
import {SecurityService} from "./services/security/security.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private securityService: SecurityService) {}
  title = 'blog-projet';
  username?: string;
  ngOnInit() {
    const user = this.securityService.getLocalUser();
    if(user) {
      this.username = user.username;
    }
  }

  logout() {
      this.securityService.logout();
  }
}
