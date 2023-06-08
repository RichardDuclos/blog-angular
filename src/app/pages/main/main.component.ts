import {Component, Input, OnInit} from '@angular/core';
import {Article} from "../../models/article.model";
import {ArticleService} from "../../services/article/article.service";
import {User} from "../../models/user.model";
import {SecurityService} from "../../services/security/security.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{
  @Input() user?: User;

  ngOnInit(): void {
    const user = this.securityService.getLocalUser();
    if(!user) {
      throw new Error('user must be logged in')
    }
    this.user = user;
  }

  constructor(private securityService: SecurityService) {
  }

}
