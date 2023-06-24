import {Component, OnInit} from '@angular/core';
import {Article} from "../../models/article.model";
import {SecurityService} from "../../services/security/security.service";
import {User} from "../../models/user.model";
import {CommentService} from "../../services/comment/comment.service";
import {HttpResponse} from "@angular/common/http";
import {Comment} from "../../models/comment.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit{
  comments: Comment[] = [];
  user?: User;
  subscription?: Subscription;
  commentsReady: boolean = false;
  constructor(private securityService: SecurityService, private commentService: CommentService) {
  }

  ngOnInit() {
    this.user = this.securityService.getLocalUser();
    if(!this.user) {
      this.securityService.logout();
    }
    this.fetchUnverifiedComments()

  }
  protected fetchUnverifiedComments() {

    this.subscription = this.commentService.get()
      .subscribe(
        (comments: Comment[]) => {
          this.comments = comments.filter((comment: Comment) => {
            return !comment.validated
          })
          this.commentsReady = true;
        }
      )
  }

  unverifiedCommentsUpdated() {
    this.commentsReady = false;
    this.fetchUnverifiedComments()
  }

}
